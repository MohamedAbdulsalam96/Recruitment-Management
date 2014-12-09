frappe.provide("frappe.ui.form");
$(document).ready(function() {
var $table1=$(document).find('#carrer')
show_content();
// var h = "<br><div>We appreciate your interest in exploring career opportunities through us.&nbsp;</div><div><br></div><div>At HumanCapita,we service a wide range of industry verticals, technology platforms, and business functions. This multifarious exposure provides you with growth opportunities at every step of your career. HumanCapitalets you draw upon its superlative  treasure of experience and expertise to add to yours.&nbsp;</div><div><br></div><div>We believe in providing a multi-faceted exposure across domains and roles that are equipped with a flexibility that allows you to discover your ideal role, and thus helping you achieve your true potential.&nbsp;</div><div><br></div><div>This translates into:&nbsp;</div><div>&nbsp; <li>Constant opportunities to discover your forte while you work across domains.&nbsp;</div><div>&nbsp;</li><li> Benefit of best-in-class practices and learning for our customers.</li></div><div><br></div>"
// $(h).appendTo('#carrer');
$('<br><table cellspacing="3"width="100%">\
    <tr><td><div class="form-group" style="width:20%;"><button  class="btn btn-primary btn-send">Search Jobs</button></div></td>\
    <br><td><div class="form-group"><button  class="btn btn-primary btn-search">Register & Upload Resume</button></div></td></tr></table>').appendTo('#carrer');
$('.btn-send').click(function() {
            $(".btn-send").prop("disabled", true);
            clear_data();
           
})
});
$('.btn-search').click(function() {
        console.log("in the serach click");
            redirect_url(); 
})



var clear_data = function(){
    console.log("clear_data");
    $("#carrer").empty();
    $('<br><table cellspacing="20" width="100%">\
    	<tr><tr></td><td><div class="form-group"><input class="form-control" name="keyword" type="text" placeholder="Keyword" /></div>\
    	</td><td><div class="form-group"><input class="form-control" name="jobid" type="text" placeholder="Job Id" /></div>\
    	</td><td><div class="form-group"><input class="form-control" name="experience" type="text" placeholder="Experience" /></div>\
    	</td><td><div class="form-group"><input class="form-control" name="location" type="text" placeholder="Location"/></div>\
    	</td><td><div class="form-group"><input class="form-control" name="role" type="text" placeholder="Role" /></div></td></tr>\
    	 <td><input class="form-control" name="job_from_date" type="date" placeholder="Posted Date From" /></div>\
    	</td><td><input class="form-control" name="job_to_date" type="date" placeholder="Posted Date To" /></div></tr><br>\
    <tr><td><br><div class="form-group"><button  class="btn btn-primary btn-search">Search Jobs</button></div></td>\
    <td><button  class="btn btn-primary btn-search uop">Register & Upload Resume</button></td>\
    </tr></table></table><div class="res" width="100%"></div>').appendTo('#carrer');
    // $('#carrer').find('.btn-search').click(function() {         
            show_details(); 
                       
	    // })
    // }
    $('.uop').click(function() {
        console.log("in the serach click");
            redirect_url(); 
})

}




var redirect_url=function(){
     window.location.assign("../login#")
    console.log('in the re');

} 


var show_details = function(){
    console.log("in the show show_details");
    frm_data = get_frm_details()
    frappe.call({
        method:"hr_mgmt.templates.pages.carrer.get_jobs",
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
                    //console.log("result cleared");
					var $table1=$(document).find('.res')
					var h = "<table width='100%' border='1'><thead style='padding=0px;'><tr style='padding=0px;'><th>#</th><th>Job ID</th><th>Role</th><th>Job Title</th><th>Location</th><th>Experience</th><th>Posted Date</th></tr></thead><tbody style='padding=0px;'>"
                    for (i=0;i<r.message.length;i++){
                        var j=i+1
                        h += '<tr style="padding=0px;">'
                        h += '<td>'+j+'</td>'
                        h += "<td><a onClick=call_job('"+r.message[i][0]+"')>"+r.message[i][0]+"</a></td>"
                        h += '<td>'+r.message[i][1]+'</td>'
                        h += '<td>'+r.message[i][2]+'</td>'
                        h += '<td>'+r.message[i][3]+'</td>'
                        h += '<td>'+r.message[i][4]+'</td>'
                        h += '<td>'+r.message[i][5]+'</td></tr>'                       
                       }
                    h+='</tbody></table>'
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
        method:"hr_mgmt.templates.pages.carrer.get_job",
        args:{'job':job},        
		callback: function(r) {
                //console.log(r.message)
				if(r.message) {
					var jb="<marquee behavior='SCROLL' ><font size='4' color='green'>You can update your profile before applying for this job. Click on your name (Right corner), go to 'My Profile'.</font></marquee><br><table width='100%' ><tr style='padding=0px;'><tr><td><b>Job Title</b></td><td>"+r.message[0][1]+"</td></tr><tr><td><b>Job ID</b></td><td>"+r.message[0][0]+"</td></tr><tr><td><b>Location</b></td><td>"+r.message[0][2]+"</td></tr><tr><td><b>Experience Required</b></td><td>"+r.message[0][3]+"</td></tr><tr><td><b>Job Role</b></td><td>"+r.message[0][4]+"</td></tr><tr><td><b>Qualification</b></td><td>"+r.message[0][5]+"</td></tr><tr><td><b>Skills Required</b></td><td>"+r.message[0][6]+"</td></tr><tr><td><b>Job Description</b></td><td>"+r.message[0][8]+"</td></tr></table>"
					$(jb).appendTo('#carrer');
                  }	
                  $('<br><button  class="btn btn-primary btn-apply">Apply Now</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  class="btn btn-primary btn-back">Back</button><div class="res" width="100%"></div>').appendTo('#carrer');		
                  $('#carrer').find('.btn-apply').click(function() {         
                        $('.btn-apply').prop("disabled", true);
                        apply_job(r.message[0][0])                        
                   })
                  $('#carrer').find('.btn-back').click(function() {         
                        $('.btn-back').prop("disabled", true);
                        clear_data();
                    })
				}        
      })       
}

var apply_job = function(jobid){
    frappe.call({
        method:"hr_mgmt.templates.pages.carrer.apply_job",
        args:{
            "jobid":jobid,            
        },        
        callback: function(r) {
            console.log("r.message")
            console.log(r.message)
            if (r.message=='Already Applied for the same job id'){
                alert("You have already applied for same job '"+jobid+"'");
            }
            else{
                alert("You have successfully applied to Job '"+jobid+"'");
            }
        }                     
    })
 }

 var show_content = function(){
    console.log("in the show_content ");
    // frm_data = get_frm_details()
    frappe.call({
        method:"hr_mgmt.templates.pages.carrer.getcarrier",
         
        callback: function(r) {
                // $("#carrer").empty();
                if(r.message) {                    
                    // console.log("result cleared");
                    // console.log(r.message.res[0]['value']);
                    //var $table1=$(document).find('.res')
                    //var h = "<table width='100%' border='1'><thead style='padding=0px;'><tr style='padding=0px;'><th>#</th><th>Job ID</th><th>Role</th><th>Job Title</th><th>Location</th><th>Experience</th><th>Posted Date</th></tr></thead><tbody style='padding=0px;'>"
                    var h = "<div>"+r.message.res[0]['value']+"</div>"
                    console.log(h);
                    $(h).appendTo('#carrer');
                   
                    
                  }         
                }     
      })
 }



