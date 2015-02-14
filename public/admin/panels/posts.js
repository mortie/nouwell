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

		lib.template.load(["posts", "postsEntry"], async);

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
					console.log(post);
					postsStr += lib.template("postsEntry",
					{
						"id": post.id,
						"title": post.title
					}, false);
				});
			}

			lib.template("posts",
			{
				"posts": postsStr
			});

			//delete post on click
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

			//go to post on click
			gui.on(".post .name", "click", function(element)
			{
				var id = element.getAttribute("data-id");

				router.path = "posts/edit/"+id;
			});

			//move post up on click
			gui.on(".post .arrow-up", "click", function(element)
			{
				var id = element.getAttribute("data-id");
				var prev = element.parentNode.parentNode.previousElementSibling;

				if (!prev || !prev.getAttribute("data-id"))
					return;

				var prevId = prev.getAttribute("data-id");

				lib.callAPI("swapPosts",
				{
					"post1": id,
					"post2": prevId
				}, function(result)
				{
					router.load();
					nav.load();
				});
			});

			//move post down on click
			gui.on(".post .arrow-down", "click", function(element)
			{
				var id = element.getAttribute("data-id");
				var next = element.parentNode.parentNode.nextElementSibling;

				if (!next || !next.getAttribute("data-id"))
					return;

				var nextId = next.getAttribute("data-id");

				lib.callAPI("swapPosts",
				{
					"post1": id,
					"post2": nextId
				}, function(result)
				{
					router.load();
					nav.load();
				});
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
				}, function(result)
				{
					if (result.success)
						gui.notify("Post updated!");
					else
						gui.error("An error occurred. Post not updated.");
				});
			}
		}
	}
});
