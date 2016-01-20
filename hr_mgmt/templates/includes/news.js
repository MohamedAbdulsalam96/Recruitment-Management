$(document).ready(function() {
var count=0;
	frappe.call({
			type: "POST",
			method: "hr_mgmt.templates.pages.news.get_news",
			callback: function(r) {
				if(r.message) {
					var $table1=$(document).find('#news')
                    var h = "<br><ul id='list' style='padding:0'>"
                    for (i=0;i<r.message.length;i++){
                        //var j=i+1
                        count+=1;
                        h+='<li>'
                        if (r.message[i][1]){
                            h += "<img src='"+r.message[i][1]+"'  width='100%' height='250'><br> <br>"
                        }
                        h += '<b>'+r.message[i][3]+'</b><br>'
                        h += '<b>'+r.message[i][2]+'</b><br><br>'
                        h += r.message[i][0]+'</li>'                                              
                       }
   					   create(count)
                       h+='</ul>'
                       $(h).appendTo('#news');
                       go_to_page(0)
                  }			
				}
		})
    var show_per_page = 1;
    var number_of_items = $('#list').children('li').size();
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
    $('.controls').html(navigation_html);
    $('.controls .page:first').addClass('active');
    $('#list').children().css('display', 'none');
    $('#list').children().slice(0, show_per_page).css('display', 'block');*/
    
});

function create(rowsno) {

	var show_per_page = 1;
    var number_of_items = $('#list1').children('li').size();
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
    $('.controls').html(navigation_html);
    $('.controls .page:first').addClass('active');
    $('#list').children().css('display', 'none');
    $('#list').children().slice(0, show_per_page).css('display', 'block');    
}

function go_to_page(page_num) {
    var show_per_page = 1
    start_from = page_num *1;
    end_on = start_from + 1;
    $('#list1').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    $('.page[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');
    $('#current_page').val(page_num);
}
function previous() {
    new_page = parseInt($('#current_page').val(), 0) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page').length == true) {
        go_to_page(new_page);
    }
}

function next() {
    new_page = parseInt($('#current_page').val(), 0) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.page').length == true) {
        go_to_page(new_page);
    }
}









