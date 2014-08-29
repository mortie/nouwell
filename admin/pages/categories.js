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
		});
	}
});
