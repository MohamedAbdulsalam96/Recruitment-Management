frappe.provide("frappe.ui.form");
$(document).ready(function() {
    $('.btn-send').click(function() {
        $(".btn-send").prop("disabled", true);
            clear_data();
     });
});


var clear_data = function(){
    $("#carrer").empty();
    $('<div class="row"><div class="col-xs-4" align="right">Keyword</div><div class="col-xs-8">\
      <div class="form-group"><input class="form-control" name="keyword" type="text"\
        /></div></div></div><div class="row"><div class="col-xs-4" align="right">\
       Job ID</div><div class="col-xs-8"><div class="form-group"><input class="form-control"\
        name="jobid" type="text" /></div></div></div><div class="row">\
        <div class="col-xs-4" align="right">Experience</div><div class="col-xs-8"><div class="form-group">\
        <input class="form-control" name="experience" type="text" />\
        </div></div></div><div class="row"><div class="col-xs-4" align="right">Location</div><div class="col-xs-8">\
        <div class="form-group"><input class="form-control" name="location" type="text" />\
        </div></div></div><div class="row"><div class="col-xs-4" align="right">Role</div><div class="col-xs-8">\
        <div class="form-group"><input class="form-control" name="role" type="text" />\
        </div></div></div><div class="row"><div class="col-xs-4" align="right">Posted Date From</div><div class="col-xs-8">\
        <div class="form-group"><input class="form-control" name="job_from_date" type="date" \
        /></div></div></div><div class="row"><div class="col-xs-4" align="right">\
        Posted Date To</div><div class="col-xs-8"><div class="form-group"><input class="form-control hasDatepicker" name="job_to_date" \
        type="Date"/></div></div></div><div class="row">\
        <div class="col-xs-12" align="center"><div class="form-group"><button class="btn \
        btn-primary btn-search">&nbsp;&nbsp;&nbsp;Search Jobs</button></div></div></div>\
        <div class="row"><div class="col-xs-12 res"></div></div>').appendTo("#carrer")
    $('#carrer').find('.btn-search').click(function() {         
            show_details(); 
                       
	    })
        $('.uop').click(function() {
            redirect_url(); 
        })
}

var redirect_url=function(){
     window.location.assign("../login#")
} 

var show_details = function(){
    //console.log("in the show show_details");
    frm_data = get_frm_details()
    frappe.call({
        method:"hr_mgmt.templates.pages.careers.get_jobs",
        args:{
            "keyword" : $('[name="keyword"]').val(), 
            "jobid":$('[name="jobid"]').val(), 
            "experience" : $('[name="experience"]').val(),
            "location" : $('[name="location"]').val(),
            "role" : $('[name="role"]').val(),
            "job_from_date" : $('[name="job_from_date"]').val(),
            "job_to_date" : $('[name="job_to_date"]').val(),
        },        
		callback: function(r) {
                  $(".res").empty();
				if(r.message) {                    
                    var $table1=$(document).find('.res')
                    var h = "<div class='table-responsive'><table class='table table-bordered'>\
                    <thead><tr><th>Sr No.</th><th>Job ID</th><th>Role</th><th>Job Title</th><th>\
                    Location</th><th>Experience</th><th>Posted Date</th><th>Job details</th></tr>\
                    </thead><tbody>"
                    for (i=0;i<r.message.length;i++){
                        var j=i+1
                        h += '<tr>'
                        h += '<td>'+j+'</td>'
                        h += "<td>"+r.message[i][0]+"</td>"
                        h += '<td>'+r.message[i][1]+'</td>'
                        h += '<td>'+r.message[i][2]+'</td>'
                        h += '<td>'+r.message[i][3]+'</td>'
                        h += '<td>'+r.message[i][4]+'</td>'
                        h += '<td>'+r.message[i][5]+'</td>' 
                        h += "<td align='center'><button class='btn btn-primary btn-send'\
                         onclick=call_job('"+r.message[i][0]+"') style='background-color: #13783c;\
                          color:#FFFFFF; font-size:12px; height:30px; width:100px; margin-bottom: 1px;\
                           margin-top: 1px; padding-top: 5px;'>Apply Now</button></td></tr>"                
                       }
                    h+='</tbody></table></div>'
                    $(h).appendTo($table1);
                  }			
				}     
      })
 }

var get_frm_details = function(){
        return {
        	    "keyword" : $('[name="keyword"]').val(), 
                "jobid":$('[name="jobid"]').val(), 
                "experience" : $('[name="experience"]').val(),
                "location" : $('[name="location"]').val(),
                "role" : $('[name="role"]').val(),
                "job_from_date" : $('[name="job_from_date"]').val(),
                "job_to_date" : $('[name="job_to_date"]').val(),
               }
}

var call_job = function(job){
    $("#carrer").empty();
    $('<div class="jobdtl" width="100%"></div>').appendTo('#carrer');
    frappe.call({
        method:"hr_mgmt.templates.pages.careers.get_job",
        args:{'job':job},        
		callback: function(r) {
            //console.log(r.message['res'])
               if(r.message['res'][0]) {
					var jb="<marquee behavior='SCROLL' ><font size='4' color='green'>You can update your profile before applying for this job. Click on your name (Right corner), go to 'My Profile'.</font></marquee><br><table width='100%' ><tr style='padding=0px;'><tr><td><b>Job Title</b></td><td>"+r.message['res'][0][1]+"</td></tr><tr><td><b>Job ID</b></td><td>"+r.message['res'][0][0]+"</td></tr><tr><td><b>Location</b></td><td>"+r.message['res'][0][2]+"</td></tr><tr><td><b>Experience Required</b></td><td>"+r.message['res'][0][3]+"</td></tr><tr><td><b>Job Role</b></td><td>"+r.message['res'][0][4]+"</td></tr><tr><td><b>Qualification</b></td><td>"+r.message['res'][0][5]+"</td></tr><tr><td><b>Skills Required</b></td><td>"+r.message['res'][0][6]+"</td></tr><tr><td><b>Job Description</b></td><td>"+r.message['res'][0][8]+"</td></tr></table>"
					$(jb).appendTo('#carrer');
                  }	
                if (r.message['usr']=='Yes'){
                  $('<br><button  class="btn btn-primary btn-apply" >Apply Now</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  class="btn btn-primary btn-back">Back</button><div class="res" width="100%"></div>').appendTo('#carrer');		
                  $('#carrer').find('.btn-apply').click(function() {         
                        $('.btn-apply').prop("disabled", true);
                        apply_job(r.message['res'][0][0])                        
                   })
                   $('#carrer').find('.btn-back').click(function() {         
                        $('.btn-back').prop("disabled", true);
                        clear_data();
                    })

                   }
                else{
                    $('<br><button  class="btn btn-primary btn-apply" >Apply Now</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  class="btn btn-primary btn-back">Back</button>').appendTo('#carrer'); 
                     $('#carrer').find('.btn-apply').click(function() {         
                        //$('.btn-apply').prop("disabled", true);
                        frappe.msgprint("You have not logged in . Please login for apply for job.");                       
                      })
                    $('#carrer').find('.btn-back').click(function() {         
                        $('.btn-back').prop("disabled", true);
                        clear_data();
                    })       
                     }
                  
				}        
      })       
}

var apply_job = function(jobid){
    frappe.call({
        method:"hr_mgmt.templates.pages.careers.apply_job",
        args:{
            "jobid":jobid,            
        },        
        callback: function(r) {
            if (r.message=='Already Applied for the same job id'){
                frappe.msgprint("You have already applied for same job '"+jobid+"'");
            }
            else{
                frappe.msgprint("You have successfully applied to Job '"+jobid+"'");
            }
        }                     
    })
 }
