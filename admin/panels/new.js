router.addPanel("new", function(args)
{
	var async = new lib.Async(1, draw);

	lib.template.load(["editor"], async);

	function draw()
	{
		router.ready();

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
				"slug": lib.slugify(title),
				"date_seconds": new Date().getTime() / 1000,
				"page_id": args[1],
			},
			function(result)
			{
				console.log(result);
				router.path = "entries/edit/"+result.id;
			});
		}
	}
});
