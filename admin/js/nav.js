(function()
{
	var template = new Template(
	{
		"element": document.getElementById("nav")
	});

	var navElement = document.getElementById("nav");

	var pages =
	[
		["Home", "home"],
		["New", [["Shit", "shit"], ["More Shit", "moreShit"]], "new"],
		["Entries", "entries"],
		["Categories", "categories"],
		["Media", "media"],
		["Settings", "settings"]
	]

	var callbacks = 3;

	//populate "new"
	lib.callAPI("getCategories", {}, function(result)
	{
		var New = pages.filter(function(p)
		{
			if (p[0] === "New") return true;
			else return false;
		});

		//New[1] = result.categories;

		--callbacks;
		if (callbacks === 0)
			draw();
	});

	template.load(["navEntry", "navEntryDropdown"], function()
	{
		--callbacks;
		if (callbacks === 0)
			draw();
	});

	router.on("load", function(first)
	{
		--callbacks;
		if (!first || callbacks === 0)
			draw();
	});

	function draw()
	{
		navElement.innerHTML = "";
		pages.forEach(function(page)
		{
			if (typeof page[1] === "string")
				drawWithoutDropdown(page);
			else
				drawWithDropdown(page);
			
		});
	}

	function drawWithoutDropdown(page)
	{
		if (router.page === page[1])
			var current = "current";
		else
			var current = "";

		template("navEntry",
		{
			"name": page[0],
			"current": current,
			"onclick": "router.path = '"+page[1]+"'",
		});
	}

	function drawWithDropdown(page)
	{
		if (router.page === page[2])
			var current = "current";
		else
			var current = "";

		dropdown = "";

		page[1].forEach(function(p)
		{
			if (router.path.split("/")[1] === p[1])
				var current = "current";
			else
				var current = "";

			dropdown += template("navEntryDropdown",
			{
				"name": p[0],
				"current": current,
				"onclick": "router.path = '"+page[2]+"/"+p[1]+"'"
			}, false);
		});

		template("navEntry",
		{
			"name": page[0],
			"current": current,
			"dropdown": dropdown,
			"hasDropdown": "hasDropdown"
		});
	}
})();
