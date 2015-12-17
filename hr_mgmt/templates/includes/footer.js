frappe.provide("frappe.ui.form");
$(document).ready(function() {
    $('.btn-stay-updated').click(function() {
        // $(".btn-stay-updated").prop("disabled", true);
        create_lead();
     });
});

create_lead = function(){
    email = $("#stay-updated-email").val()

    frappe.call({
      method: "hr_mgmt.custom_method.create_lead",
      args: {
        email:email
      },
      callback: function(r){
        frappe.msgprint(r.message);
      }
    })
}