
/*$(document).ready(function() {
//console.log("hiii");
frappe.call({
			type: "POST",
			method: "hr_mgmt.templates.pages.news.get_news",
			callback: function(r) {
				if(r.message) {
					console.log(r.message);
					var $table1=$(document).find('#news')
                    var h = "<table align='center' cellpadding='150' cellspacing='13' width='80%'><tr style='padding=0px;'></thead><tbody style='padding=0px;'>"
                    for (i=0;i<r.message.length;i++){
                        var j=i+1
                        h += '<tr><td width="50%">'
                        if (r.message[i][1]){
                            h += "<img src='"+r.message[i][1]+"'  width='100%' height='250'><br> "
                        }
                        h += '<b>'+r.message[i][3]+'</b><br>'
                        h += '<b>'+r.message[i][2]+'</b><br>'
                        h += r.message[i][0]+'</td></tr></tbody>'                       
                       }$(h).appendTo('#news');
                  }			
				}
		})
});*/


$(document).ready(function() {
var count=0;
	frappe.call({
			type: "POST",
			method: "hr_mgmt.templates.pages.news.get_news",
			callback: function(r) {
				if(r.message) {
					//console.log(r.message);
					var $table1=$(document).find('#news')
                    var h = "<br><ul id='list'>"
                    for (i=0;i<r.message.length;i++){
                        //var j=i+1
                        count+=1;
                        //console.log('in for loop count');
    					//console.log(count);
                        h+='<li>'
                        if (r.message[i][1]){
                            h += "<img src='"+r.message[i][1]+"'  width='100%' height='250'><br> <br>"
                        }
                        h += '<b>'+r.message[i][3]+'</b><br>'
                        h += '<b>'+r.message[i][2]+'</b><br><br>'
                        h += r.message[i][0]+'</li>'                                              
                       }
                       //console.log('exit for  count');
   					   //console.log(count);
   					   create(count)
                       h+='</ul>'
                       $(h).appendTo('#news');
                       go_to_page(0)
                       //console.log("hhhh");
                       //console.log(h);
                  }			
				}
		})
/*//console.log("hiii");
    var show_per_page = 1;
    var number_of_items = $('#list').children('li').size();
    console.log('outer count');
    console.log(count);
    number_of_items=3;
    var show_per_page=1
    var number_of_pages = Math.ceil(number_of_items / show_per_page);   
    $('#news').append('<style>.controls a{ padding:3px;    border:1px solid gray;    margin:2px;    color:black;    text-decoration:none}.active{    background:darkblue;    color:white !important;}</style><div class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>');
    $('#current_page').val(0);
    //$('#show_per_page').val(show_per_page);

    var navigation_html = '<a class="prev" onclick="previous()">Prev</a>';
    var current_link = 0;
    while (number_of_pages > current_link) {
        navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
    }
    navigation_html += '<a class="next" onclick="next()">Next</a>';
    //console.log(navigation_html)
    $('.controls').html(navigation_html);
    $('.controls .page:first').addClass('active');
    $('#list').children().css('display', 'none');
    $('#list').children().slice(0, show_per_page).css('display', 'block');*/
    
});

function create(rowsno) {
	//console.log(" in go new page");

	var show_per_page = 1;
    var number_of_items = $('#list').children('li').size();
    //console.log('outer count');
    //console.log(rowsno);
    number_of_items=rowsno;
    var show_per_page=1
    var number_of_pages = Math.ceil(number_of_items / show_per_page);   
    $('#news').append('<style>.controls a{ padding:3px;border:1px solid gray;margin:2px;color:black;text-decoration:none}.active{ background:#e7e7e7; color:black !important;}</style><div class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>');
    $('#current_page').val(0);
    //$('#show_per_page').val(show_per_page);
    var navigation_html = '<a class="prev" onclick="previous()">Prev</a>';
    var current_link = 0;
    while (number_of_pages > current_link) {
        navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
    }
    navigation_html += '<a class="next" onclick="next()">Next</a>';
    //console.log(navigation_html)
    $('.controls').html(navigation_html);
    $('.controls .page:first').addClass('active');
    $('#list').children().css('display', 'none');
    $('#list').children().slice(0, show_per_page).css('display', 'block');    
}

function go_to_page(page_num) {
	//console.log(" in go new page");
    var show_per_page = 1
    start_from = page_num *1;
    end_on = start_from + 1;
    $('#list').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    $('.page[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');
    $('#current_page').val(page_num);
}
function previous() {
	//console.log("in previous function");
    new_page = parseInt($('#current_page').val(), 0) - 1;
    //console.log(new_page);
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page').length == true) {
        go_to_page(new_page);
    }
}

function next() {
	//console.log("in next function");
    new_page = parseInt($('#current_page').val(), 0) + 1;
    //console.log(new_page);
    //if there is an item after the current active link run the function
    if ($('.active').next('.page').length == true) {
    	//console.log("active");
        go_to_page(new_page);
    }
}









