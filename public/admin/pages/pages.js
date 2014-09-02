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

		var elements = document.querySelectorAll(".entry .name");
		
		var i;
		for (i=0; i<elements.length; ++i)
		{
			gui.onEditAndPause(elements[i], function(element)
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
		}

		elements = document.querySelectorAll(".entry .delete");

		for (i=0; i<elements.length; ++i)
		{
			//create scope
			(function()
			{
				var element = elements[i];
				element.addEventListener("click", function()
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
			})();
		}

		var addButton = document.getElementById("add");
		var newField = document.getElementById("new");

		addButton.addEventListener("click", function()
		{
			add(newField.value);
		});

		newField.addEventListener("keypress", function(e)
		{
			if (e.keyCode === 13)
				add(newField.value)
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
