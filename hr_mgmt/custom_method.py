import frappe

@frappe.whitelist(allow_guest='True')
def create_lead(email):
	if not frappe.db.get_value("Lead", {"email_id":email}, "name"):
		lead = frappe.new_doc("Lead")
		lead.lead_name = email
		lead.email_id = email
		lead.source = "Website"
		lead.save(ignore_permissions=True)

		return "Subscribed Successfully .."
	else:
		return "You have already subscribed .."