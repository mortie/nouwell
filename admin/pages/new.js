router.addPage("new", function(args)
{
	lib.template.load(["editor"], function()
	{
		draw();
	});

	function draw()
	{
		lib.template("editor");

		window.editor = lib.editor();

		editor.onsubmit = function()
		{
			var markdown = editor.codemirror.doc.getValue();
			var html = marked(markdown);
			var title = editor.title.value;
			
			lib.callAPI("addEntry",
			{
				"title": title,
				"raw": markdown,
				"html": html,
				"slug": title.replace(/\s+/, "-")
				             .replace(/[^a-zA-Z0-9]/, ""),
				"categories_id": args[1],
			},
			function(result)
			{
				console.log(result);
				router.path = "entries/edit/"+result.id;
			});
		}
	}
});
