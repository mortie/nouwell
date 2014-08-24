router.addPage("new", function(args)
{
	var entry = {};

	var callbacks = 2;

	lib.callAPI("getEntry",
	{
		"slug": args[1]
	},
	function(result)
	{
		--callbacks;
		if (callbacks === 0)
			draw();
	}

	lib.template.load(["editor"], function()
	{
		--callbacks;
		if (callbacks === 0)
			draw();
	});

	function draw()
	{
		lib.template("editor", entry);
		var editor = lib.editor();

		editor.onsubmit = function()
		{
			var markdown = editor.codemirror.doc.getValue();
			var html = marked(markdown);
			
			lib.callAPI("updateEntry",
			{
				"title": editor.title.value,
				"slug": editor.slug.value,
				"raw": markdown,
				"html": html
			},
			function(result)
			{
				if (editor.slug !== args[1])
					router.path = "edit/"+editor.slug;
			});
		}
	}
});
