router.addPage("categories", function()
{
	var categories;

	var callbacks = 2;

	lib.template.load(["categories", "categoriesEntry"], function()
	{
		--callbacks;
		if (callbacks === 0) draw();
	});

	lib.callAPI("getCategories", {}, function(result)
	{
		categories = result.categories;

		--callbacks;
		if (callbacks === 0) draw();
	});

	function draw()
	{
		var entries = "";
		categories.forEach(function(category)
		{
			entries += lib.template("categoriesEntry",
			{
				"name": category.name,
				"id": category.id
			}, false);
		});

		lib.template("categories",
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

				lib.callAPI("updateCategory",
				{
					"id": id,
					"name": element.value
				},
				function(result)
				{
					console.log(result);
					if (result.success)
						nav.load();
					else
						gui.error("Can't delete category. It contains entries.");
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

					lib.callAPI("deleteCategory",
					{
						"id": id
					},
					function(result)
					{
						if (!result.success)
						{
							gui.error("Couldn't delete category because it contains entries.");
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

	function add(name)
	{
		lib.callAPI("addCategory",
		{
			"name": name
		},
		function()
		{
			router.load();
			nav.load();
		});
	}
});
