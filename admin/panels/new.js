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
			
			lib.callAPI("addPost",
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
				if (result.success)
				{
					gui.notify("Post created!");
					router.path = "posts/edit/"+result.id;
				}
				else
				{
					gui.error("Could not create post.");
				}
			});
		}
	}
});
