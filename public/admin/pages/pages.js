router.addPage("pages", function()
{
	var pages;

	var callbacks = 2;

	lib.template.load(["pages", "pagesEntry"], function()
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
		var entries = "";
		pages.forEach(function(page)
		{
			entries += lib.template("pagesEntry",
			{
				"title": page.title,
				"id": page.id
			}, false);
		});

		lib.template("pages",
		{
			"entries": entries
		});

		gui.onEditAndPause(".entry .name", function(element)
		{
			var id = element.className.split(/\s+/)[0];
			var title = element.title;
			var slug = title.replace(/\s+/g, "-").toLowerCase();

			lib.callAPI("updatePage",
			{
				"id": id,
				"title": title,
			},
			function(result)
			{
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
					gui.error("Couldn't delete page because it contains entries.");
				}
				else
				{
					router.load();
					nav.load();
				}
			});
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

	function add(title)
	{
		lib.callAPI("addPage",
		{
			"title": title,
			"slug": lib.slugify(title)
		},
		function()
		{
			router.load();
			nav.load();
		});
	}
});
