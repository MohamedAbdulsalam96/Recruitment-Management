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
def get_jobs():
	qry="select a.name,a.role,a.job_title,a.location,a.experience_required,b.status,date_format(b.creation,'%d/%m/%Y') from `tabJob Description` a, `tabJob Applied` b where a.name=b.job_id and b.parent='"+frappe.session.user+"'"
	res=frappe.db.sql(qry)
	return res