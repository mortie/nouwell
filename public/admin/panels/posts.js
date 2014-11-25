router.addPanel("posts", function(args)
{
	if (args[1] === "edit")
		edit();
	else
		list();

	function list()
	{
		var posts;

		var async = new lib.Async(2, draw);

		lib.template.load(["posts", "post"], async);

		lib.callAPI("getPosts",
		{
			"page_id": args[1]
		},
		function(result)
		{
			posts = result.posts || [];
			async();
		});

		function draw()
		{
			router.ready();

			if (!posts.length)
			{
				var postsStr = "No posts.";
			}
			else
			{
				var postsStr = "";
				posts.forEach(function(post)
				{
					postsStr += lib.template("post", post, false);
				});
			}

			lib.template("posts",
			{
				"posts": postsStr
			});

			gui.on(".post .delete", "click", function(element)
			{
				var id = element.getAttribute("data-id");

				lib.callAPI("deletePost",
				{
					"id": id
				},
				function()
				{
					router.load();
				});
			});

			gui.on(".post .name", "click", function(element)
			{
				var id = element.getAttribute("data-id");

				router.path = "posts/edit/"+id;
			});
		}
	};

	function edit()
	{
		var post;

		var async = new lib.Async(2, draw);

		lib.template.load(["editor"], async);

		lib.callAPI("getPost",
		{
			"id": args[2]
		},
		function(result)
		{
			post = result.post;
			async();
		});

		function draw()
		{
			router.ready();
			lib.template("editor", post);
			window.editor = lib.editor();

			editor.onsubmit = function()
			{
				var markdown = editor.codemirror.doc.getValue();
				var html = marked(markdown);
				var title = editor.title.value;

				lib.callAPI("updatePost",
				{
					"title": title,
					"slug": lib.slugify(title),
					"raw": markdown,
					"html": html,
					"id": args[2]
				});
			}
		}
	}
});
