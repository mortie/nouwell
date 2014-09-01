router.addPage("entries", function(args)
{
	if (args[1] === "edit")
		edit();
	else
		list();

	function list()
	{
		var entries;

		var callbacks = 2;

		lib.template.load(["entries", "entriesEntry"], function()
		{
			--callbacks;
			if (callbacks === 0) draw();
		});

		lib.callAPI("getEntries",
		{
			"categories_id": args[1]
		},
		function(result)
		{
			entries = result.entries;

			--callbacks;
			if (callbacks === 0) draw();
		});

		function draw()
		{
			var entriesStr = "";
			entries.forEach(function(entry)
			{
				entriesStr += lib.template("entriesEntry", entry, false);
			});

			lib.template("entries",
			{
				"entries": entriesStr
			});
		}
	};

	function edit()
	{
		var entry;

		var callbacks = 2;

		lib.template.load(["editor"], function()
		{
			--callbacks;
			if (callbacks === 0) draw();
		});

		lib.callAPI("getEntry",
		{
			"id": args[2]
		},
		function(result)
		{
			entry = result.entry;

			--callbacks;
			if (callbacks === 0) draw();
		});

		function draw()
		{
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
				},
				function(result)
				{
					if (result.success)
						gui.notify("Updated");
				});
			}
		}
	}
});
