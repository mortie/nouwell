router.addPanel("entries", function(args)
{
	if (args[1] === "edit")
		edit();
	else
		list();

	function list()
	{
		var entries;

		var async = new lib.Async(2, draw);

		lib.template.load(["entries", "entriesEntry"], async);

		lib.callAPI("getEntries",
		{
			"page_id": args[1]
		},
		function(result)
		{
			entries = result.entries || [];
			async();
		});

		function draw()
		{
			router.ready();

			if (!entries.length)
			{
				var entriesStr = "No entries.";
			}
			else
			{
				var entriesStr = "";
				entries.forEach(function(entry)
				{
					entriesStr += lib.template("entriesEntry", entry, false);
				});
			}

			lib.template("entries",
			{
				"entries": entriesStr
			});

			gui.on(".entry .delete", "click", function(element)
			{
				var id = element.getAttribute("data-id");

				lib.callAPI("deleteEntry",
				{
					"id": id
				},
				function()
				{
					router.load();
				});
			});

			gui.on(".entry .name", "click", function(element)
			{
				var id = element.getAttribute("data-id");

				router.path = "entries/edit/"+id;
			});
		}
	};

	function edit()
	{
		var entry;

		var async = new lib.Async(2, draw);

		lib.template.load(["editor"], async);

		lib.callAPI("getEntry",
		{
			"id": args[2]
		},
		function(result)
		{
			entry = result.entry;
			async();
		});

		function draw()
		{
			router.ready();
			lib.template("editor", entry);
			window.editor = lib.editor();

			editor.onsubmit = function()
			{
				var markdown = editor.codemirror.doc.getValue();
				var html = marked(markdown);
				var title = editor.title.value;

				lib.callAPI("updateEntry",
				{
					"title": title,
					"raw": markdown,
					"html": html,
					"id": args[2]
				});
			}
		}
	}
});
