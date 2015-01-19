router.addPanel("pages", function()
{
	var pages;

	var async = new lib.Async(2, draw);

	lib.template.load(["pages", "pagesEntry", "pagesEntryChild"], async);

	lib.callAPI("getPages", {}, function(result)
	{
		pages = result.pages || [];
		async();
	});

	function draw()
	{
		router.ready();

		var children = [];
		pages.forEach(function(page)
		{
			var parentId = page.parent_page_id;
			if (parentId)
			{
				if (children[parentId] === undefined)
					children[parentId] = "";

				console.log(page);

				children[parentId] += lib.template("pagesEntryChild",
				{
					"title": page.title,
					"id": page.id
				}, false);
			}
		});

		var entries = "";
		pages.forEach(function(page)
		{
			if (!page.parent_page_id)
			{
				var pageChildren = children[page.id] || "";

				entries += lib.template("pagesEntry",
				{
					"title": page.title,
					"id": page.id,
					"children": pageChildren
				}, false);
			}
		});

		lib.template("pages",
		{
			"entries": entries
		});

		//update page name on edit
		gui.onEditAndPause(".entry .name", function(element)
		{
			var id = element.getAttribute("data-id");
			var title = element.value;

			console.log(id, title);

			lib.callAPI("updatePage",
			{
				"id": id,
				"title": title,
				"slug": lib.slugify(title)
			},
			function(result)
			{
				console.log(result);
				nav.load();
			});
		});

		//delete page on click
		gui.on(".entry .delete", "click", function(element)
		{
			var id = element.getAttribute("data-id");

			lib.callAPI("deletePage",
			{
				"id": id
			},
			function(result)
			{
				if (!result.success)
				{
					if (result.error == "EENTRIESINPAGE")
						gui.error("Couldn't delete page because it contains posts.");
					else if (result.error == "EHASCHILDPAGES")
						gui.error("Coludn't delete page because it contains child pages.");
				}
				else
				{
					router.load();
					nav.load();
				}
			});
		});

		//move page up on click
		gui.on(".entry .arrow-up", "click", function(element)
		{
			var id = element.getAttribute("data-id");
			var prev = element.parentNode.parentNode.previousElementSibling;
			
			if (!prev || !prev.getAttribute("data-id"))
				return;

			var prevId = prev.getAttribute("data-id");

			lib.callAPI("swapPages",
			{
				"page1": id,
				"page2": prevId
			}, function(result)
			{
				router.load();
				nav.load();
			});
		});

		gui.on(".entry .arrow-down", "click", function(element)
		{
			var id = element.getAttribute("data-id");
			var next = element.parentNode.parentNode.nextElementSibling;

			console.log(next);
			
			if (!next || !next.getAttribute("data-id"))
				return;

			var nextId = next.getAttribute("data-id");

			lib.callAPI("swapPages",
			{
				"page1": id,
				"page2": nextId
			}, function(result)
			{
				router.load();
				nav.load();
			});

		});

		//add page child on click
		gui.on(".entry .addChild", "click", function(element)
		{
			var id = element.getAttribute("data-id");

			add("New Page", id);
		});

		//ad page on click
		gui.on("#add", "click", function(element)
		{
			var inputElement = document.getElementById("new");
			add(inputElement.value);
		});

		//add page on enter
		gui.on("#new", "keypress", function(element, e)
		{
			if (e.keyCode === 13)
				add(element.value)
		});
	}

	function add(title, parentId)
	{
		parentId = parentId || false;

		console.log("adding page with parent "+parentId);

		lib.callAPI("addPage",
		{
			"title": title,
			"slug": lib.slugify(title),
			"parent_page_id": parentId
		},
		function()
		{
			router.load();
			nav.load();
		});
	}
});
