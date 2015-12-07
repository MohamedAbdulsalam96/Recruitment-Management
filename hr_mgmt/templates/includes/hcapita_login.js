window.disable_signup = {{ disable_signup and "true" or "false" }};


window.login = {};

login.bind_events = function() {
	console.log("bind_events")
	if(!window.pageInitialized){
		console.log("pageInitialized");
		$(window).on("hashchange", function() {
			console.log("hashchange in");
			login.route();
			console.log("hashchange out");
		});

		$(".form-login").on("submit", function(event) {
			console.log("form login")
			event.preventDefault();
			var args = {};
			args.cmd = "login";
			args.usr = ($("#login_email").val() || "").trim();
			args.pwd = $("#login_password").val();
			if(!args.usr || !args.pwd) {
				frappe.msgprint(__("Both login and password required"));
				return false;
			}
			console.log("before call");
			login.call(args);
		});

		$(".form-signup").on("submit", function(event) {
			event.preventDefault();
			var args = {};
			args.cmd = "frappe.core.doctype.user.user.sign_up";
			args.email = ($("#signup_email").val() || "").trim();
			args.full_name = ($("#signup_fullname").val() || "").trim();
			if(!args.email || !valid_email(args.email) || !args.full_name) {
				frappe.msgprint(__("Valid email and name required"));
				return false;
			}
			login.call(args);
		});

		$(".form-forgot").on("submit", function(event) {
			event.preventDefault();
			var args = {};
			args.cmd = "frappe.core.doctype.user.user.reset_password";
			args.user = ($("#forgot_email").val() || "").trim();
			if(!args.user) {
				frappe.msgprint(__("Valid Login id required."));
				return false;
			}
			login.call(args);
		});
	}
}


login.route = function() {
	var route = window.location.hash.slice(1);
	console.log(["route 1", route]);
	if(!route) route = "login";
	console.log(["route 2", route]);
	login[route]();
}

login.login = function() {
	$("form").toggle(false);
	$(".form-login").toggle(true);
}

login.forgot = function() {
	$("form").toggle(false);
	$(".form-forgot").toggle(true);
}

login.signup = function() {
	$("form").toggle(false);
	$(".form-signup").toggle(true);
}


// Login
login.call = function(args) {
	console.log("in login call")

	$('.btn-primary').prop("disabled", true);

	$.ajax({
		type: "POST",
		url: "/",
		data: args,
		dataType: "json",
		statusCode: login.login_handlers
	}).always(function(){
		$('.btn-primary').prop("disabled", false);
	})
}

login.login_handlers = (function() {
	var get_error_handler = function(default_message) {
		return function(xhr, data) {
			if(xhr.responseJSON) {
				data = xhr.responseJSON;
			}
			var message = data._server_messages
				? JSON.parse(data._server_messages).join("\n") : default_message;
			frappe.msgprint(message);
		};
	}

	var login_handlers = {
		200: function(data) {
			if(data.message=="Logged In") {
				console.log(["getting url args",get_url_arg("redirect-to")])
				window.location.href = get_url_arg("redirect-to") || "/desk";
			} else if(data.message=="No App") {
				if(localStorage) {
					var last_visited =
						localStorage.getItem("last_visited")
							|| get_url_arg("redirect-to")
							|| "/index";
					localStorage.removeItem("last_visited");
					window.location.href = last_visited;
				} else {
					window.location.href = "/index";
				}
			} else if(["#signup", "#forgot"].indexOf(window.location.hash)!==-1) {
				frappe.msgprint(data.message);
			}
		},
		401: get_error_handler(__("Invalid Login")),
		417: get_error_handler(__("Oops! Something went wrong"))
	};

	return login_handlers;
})();

frappe.ready(function() {
	if(!window.pageInitialized){
		console.log("onload")
		window.location.hash = "#login";
		console.log(window.location.hash);
		login.bind_events();
		login.login();
		$(".form-signup, .form-forgot").removeClass("hide");
		$(document).trigger('login_rendered');
	}
});
