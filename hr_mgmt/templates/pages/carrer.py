# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt, fmt_money
#from shopping_cart.templates.utils import get_transaction_context

no_cache = 1
no_sitemap = 1

@frappe.whitelist(allow_guest='True')
def get_jobs(keyword=None,jobid=None,experience=None,location=None,role=None,job_from_date=None,job_to_date=None):
	#frappe.errprint(["keyword",keyword,"jobid",jobid])
	cond=''
	if keyword:
	 	cond+= " and skills_required like'%"+keyword+"%'"
	if jobid:
		cond+= " and name='"+jobid+"'"	
	if experience:
		cond+= " and experience_required='"+experience+"'"
	if location:
		cond+= " and location='"+location+"'"
	if role:
		cond+= " and role='"+role+"'"
	if job_from_date:
		cond+= " and creation>='"+job_from_date+"'"	
	if job_to_date:
		cond+= " and creation<='"+job_to_date+"'"	
	#frappe.errprint(["condition ",cond])
	qry="select name,role,job_title,location,experience_required,date(creation) from `tabJob Description` where 1=1 " +cond
	#frappe.errprint(qry)
	res=frappe.db.sql(qry)
	#frappe.errprint(res)
	return res

@frappe.whitelist(allow_guest='True')
def get_job(job):
	usr=''
	res1=frappe.db.sql("""select name from `tabUser` where user_type='Website User' and name=%s """,frappe.session.user)
	if res1:
		usr='Yes'
	else:
		usr='No'
	#frappe.errprint(usr)
	res2=frappe.db.sql("""select name,job_title,location,experience_required,role,qualification_required,skills_required,role,job_description from `tabJob Description` where name=%s """,job )
	#frappe.errprint(res)
	res={
		'res':res2,
		'usr':usr
	}
	return res

@frappe.whitelist(allow_guest='True')
def apply_job(jobid=None,_type='POST'):
	qry="select name from `tabJob Applied` where parent='"+frappe.session.user+"' and job_id='"+jobid+"'"
	#frappe.errprint(qry)
	res=frappe.db.sql(qry)
	#frappe.errprint(res)
	if res:
		frappe.errprint("already applied")
		return "Already Applied for the same job id"
	ac = frappe.new_doc("Job Applied")
	ac.parent=frappe.session.user
	ac.parentfield = "job_applied"
	ac.parenttype = "User"
	ac.job_id = jobid
	#frappe.errprint(" name of doc ")
	ac.insert()
	#frappe.delete_doc("DocType", "Payment to Invoice Matching Tool")
	#frappe.db.commit()
	#frappe.errprint("deleting doc")
	#frappe.delete_doc("DocType", "Job Profile")
	frappe.db.commit()
	#frappe.errprint(ac.name)
	#frappe.errprint("applied for new job ")
	return "Applied for the new job"

@frappe.whitelist(allow_guest='True')
def removefile(fileid,_type='POST'):
	#frappe.errprint(fileid)
	qry="delete from `tabFile Data` where name='"+fileid+"'"
	#frappe.errprint(qry)
	frappe.db.sql(qry)
	#frappe.errprint(res)
	frappe.db.commit()
	return ""


@frappe.whitelist(allow_guest='True')
def getcarrier():
	#frappe.errprint("fileid")
	res=frappe.db.sql("""select main_section from `tabWeb Page` where name='your-carrer'""",as_dict=1)
	#frappe.errprint(res)
	return {
	"res":res
	}	
