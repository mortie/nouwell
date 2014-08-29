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
			
			lib.callAPI("createEntry",
			{
				"title": editor.title,
				"slug": editor.slug,
				"raw": editor.markdown,
				"html": editor.html
			},
			function(result)
			{
				router.path = "edit/"+editor.title;
			});
		}
	}
});
