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
		
	]
