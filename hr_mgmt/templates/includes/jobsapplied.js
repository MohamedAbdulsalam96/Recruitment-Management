
$(document).ready(function() {
console.log("hiii");
frappe.call({
            type: "POST",
            method: "hr_mgmt.templates.pages.jobsapplied.get_jobs",
            callback: function(r) {
                if(r.message) {
                    //console.log(r.message);
                    // var $table1=$(document).find('#jobs')
                    // var h = "<table border='1' align='center' cellpadding='150' cellspacing='13' width='80%'><tr style='padding=0px;'><th>#</th><th>Job ID</th><th>Role</th><th>Job Title</th> <th>Location</th><th>Experince</th><th>Job Applied Date</th></tr></thead><tbody style='padding=0px;'>"
                    var h = "<thead><tr><th>#</th><th>Job ID</th><th>Role</th><th>Job Title</th> <th>Location</th><th>Experince</th><th>Job Applied Date</th></tr></thead><tbody>"
                    for (i=0;i<r.message.length;i++){
                        var j=i+1
                        //h += '<tr><td width="20%">'
                        h += '<td width="4%"><b>'+i+'</b><br></td>'
                        h += '<td width="10%"><b><a href="http://localhost:9000/desk#Form/Job Description/'+r.message[i][0]+'">'+r.message[i][0]+'</a></b><br></td>'
                        h += '<td width="20%"><b>'+r.message[i][1]+'</b><br></td>'
                        h += '<td width="20%"><b>'+r.message[i][2]+'</b><br></td>'
                        h += '<td width="12%"><b>'+r.message[i][3]+'</b><br></td>'
                        h += '<td width="12%"><b>'+r.message[i][4]+'</b><br></td>'
                        h += '<td width="15%"><b>'+r.message[i][6]+'</b><br></td></tr></tbody>'
                        //h += r.message[i][0]+'</td></tr></tbody>' 
                       // console.log(h);                      
                       }
                       $(h).appendTo('#jobs');
                  }
                  else{
                    var h = '<tr align="center"><td>You haven\'t applied to any job posts yet ...</td></tr>'
                    $(h).appendTo('#jobs');
                  }         
                }
        })
});
