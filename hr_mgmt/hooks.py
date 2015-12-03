app_name = "hr_mgmt"
app_title = "hr managment"
app_publisher = "New Indictrans Technologies pvt. ltd."
app_description = "manager job applcation and process"
app_icon = "icon-book"
app_color = "#589494"
app_email = "gangadhar.k@indictranstech.com"
app_url = "google.com"
app_version = "0.0.1"

base_template="templates/hcapita_base.html"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/hr_mgmt/css/hr_mgmt.css"
#app_include_js = "/assets/frappe/js/frappe/upload.js"

# include js, css files in header of web template
# web_include_css = "/assets/hr_mgmt/css/hr_mgmt.css"
# web_include_js = "/assets/hr_mgmt/js/hr_mgmt.js"

web_include_css = "/assets/css/hr_mgmt.css"
web_include_js = "/assets/js/hr_mgmt.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "hr_mgmt.install.before_install"
# after_install = "hr_mgmt.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "hr_mgmt.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.core.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.core.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"hr_mgmt.tasks.all"
# 	],
# 	"daily": [
# 		"hr_mgmt.tasks.daily"
# 	],
# 	"hourly": [
# 		"hr_mgmt.tasks.hourly"
# 	],
# 	"weekly": [
# 		"hr_mgmt.tasks.weekly"
# 	]
# 	"monthly": [
# 		"hr_mgmt.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "hr_mgmt.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.core.doctype.event.event.get_events": "hr_mgmt.event.get_events"
# }

