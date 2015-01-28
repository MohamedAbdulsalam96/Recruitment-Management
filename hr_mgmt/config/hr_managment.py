from frappe import _

def get_data():
	return [
		{
			"label": _("Documents"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Job Description",
					"description": _("Job Description."),
				},
				{
					"type": "doctype",
					"name": "News",
					"description": _("News database."),
				},				
			]
		},
		{
			"label": _("Standard Reports"),
			"icon": "icon-list",
			"items": [
				{
					"type": "report",
					"is_query_report": True,
					"name": "Job Application Details",
					"route": "query-report/Job Application Details",
					"doctype": "User"
				},
				{
					"type": "report",
					"is_query_report": True,
					"name": "Candidate Database",
					"route": "query-report/Candidate Database",
					"doctype": "Sales Person",
				},				
			]
		},
	]

