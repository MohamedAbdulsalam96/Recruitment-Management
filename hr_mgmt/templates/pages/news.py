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
def get_news():
	#frappe.errprint("in server method")
	res=frappe.db.sql("""select news,image,DATE_FORMAT(creation,'%W %M %Y'),subject,name from `tabNews` where is_active=1 order by name """ )
	#frappe.errprint(res)
	return res