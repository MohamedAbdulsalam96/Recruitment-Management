import frappe

@frappe.whitelist(allow_guest='True')
def create_lead(email):
	lead = frappe.new_doc("Lead")
	lead.lead_name = email
	lead.email = email
	lead.source = "Website"
	lead.save(ignore_permissions=True)