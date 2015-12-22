
$(document).ready(function() {
  frappe.call({
    type: "POST",
    method: "hr_mgmt.templates.pages.jobsapplied.get_jobs",
    callback: function(r) {
        if(r.message) {
            var h = "<thead><tr><th>#</th><th>Job ID</th><th>Role</th><th>Job Title</th> <th>Location</th><th>Experince</th><th>Job Applied Date</th></tr></thead><tbody>"
            for (i=0;i<r.message.length;i++){
                var j=i+1
                var id = r.message[i][0]
                h += '<td width="4%"><b>'+i+'</b><br></td>'
                h += '<td width="10%"><b><a class="job_desc">'+id+'</a></b><br></td>'
                h += '<td width="20%"><b>'+r.message[i][1]+'</b><br></td>'
                h += '<td width="20%"><b>'+r.message[i][2]+'</b><br></td>'
                h += '<td width="12%"><b>'+r.message[i][3]+'</b><br></td>'
                h += '<td width="12%"><b>'+r.message[i][4]+'</b><br></td>'
                h += '<td width="15%"><b>'+r.message[i][6]+'</b><br></td></tr>'
            }
            h += "</tbody>"
            $(h).appendTo('#jobs');
            
            $(".job_desc").click(function(){
              display_job_description($(this).html())
            })
           }
          else{
            var h = '<tr align="center"><td>You haven\'t applied to any job posts yet ...</td></tr>'
            $(h).appendTo('#jobs');
          }         
        }
    });
});


display_job_description = function(job_id){
  frappe.call({
    method:"hr_mgmt.templates.pages.careers.get_job",
    args:{'job':job_id},
    callback: function(r) {
      $("#jobs").empty()
      var jd = r.message.res
      var tab = '<tbody><tr><td colspan="2" align="center"><b>Job Description</b></td><tr></td></tr><tr><td align="right" width="35%"><b>Job ID</b> </td><td>' + jd[0][0] + '</td></tr><tr><td align="right" width="35%"><b>Job Title</b> </td><td>' + jd[0][1] + '</td></tr><tr><td align="right" width="35%"><b>Location</b> </td><td>' + jd[0][2] + '</td></tr><tr><td align="right" width="35%"><b>Experience Required </b></td><td>' + jd[0][3] + '</td></tr><tr><td align="right" width="35%"><b>Job Role </b></td><td>' + jd[0][4] + '</td></tr><tr><td align="right" width="35%"><b>Qualification</b> </td><td>' + jd[0][5] + '</td></tr><tr><td align="right" width="35%"><b>Skills Required</b> </td><td>' + jd[0][6] + '</td></tr><tr><td align="right" width="35%"><b>Job Description</b> </td><td>' + jd[0][7] + '</td></tr></tbody>'
      $(tab).appendTo('#jobs');
    }
  });

}