router.addPage("pages", function()
{
	var pages;

	var callbacks = 2;

	lib.template.load(["pages", "pagesEntry", "pagesEntryChild"], function()
	{
		--callbacks;
		if (callbacks === 0) draw();
	});

	lib.callAPI("getPages", {}, function(result)
	{
		pages = result.pages || [];

		--callbacks;
		if (callbacks === 0) draw();
	});

	function draw()
	{
		var children = [];
		pages.forEach(function(page)
		{
			console.log(page);
			var parentId = page.parent_page_id;
			if (parentId)
			{
				if (children[parentId] === undefined)
					children[parentId] = "";

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

		gui.onEditAndPause(".entry .name", function(element)
		{
			var id = element.className.split(/\s+/)[0];
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

		gui.on(".entry .delete", "click", function(element)
		{
			var id = element.className.split(/\s+/)[0];

			lib.callAPI("deletePage",
			{
				"id": id
			},
			function(result)
			{
				if (!result.success)
				{
					if (result.error == "EENTRIESINPAGE")
					gui.error("Couldn't delete page because it contains entries.");
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

		gui.on(".entry .addChild", "click", function(element)
		{
			var id = element.className.split(/\s+/)[0];

			add("New Page", id);
		});

		gui.on("#add", "click", function(element)
		{
			add(element.value);
		});

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
