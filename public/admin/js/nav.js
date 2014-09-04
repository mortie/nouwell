(function()
{
	window.nav = {};

	nav.load = function()
	{
		populateDropdowns(function()
		{
			draw();
		});
	}

	var template = new Template(
	{
		"element": document.getElementById("nav")
	});

	var navElement = document.getElementById("nav");

	var pages =
	[
		["Home", "home"],
		["New", [], "new"],
		["Entries", [], "entries"],
		["Pages", "pages"],
		["Media", "media"],
		["Settings", "settings"],
		["Build", "build"],
		["Log Out", "logout"]
	]

	var callbacks = 3;

	populateDropdowns(function()
	{
		--callbacks;
		if (callbacks === 0) draw();
	});

	template.load(["navEntry", "navEntryDropdown"], function()
	{
		--callbacks;
		if (callbacks === 0) draw();
	});

	router.on("load", function(first)
	{
		--callbacks;
		if (!first || callbacks === 0) draw();
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

		if (page[1])
		{
			page[1].forEach(function(p)
			{
				if (router.page === page[2] && router.path.split("/")[1] === p.id)
					var current = "current";
				else
					var current = "";

				dropdown += template("navEntryDropdown",
				{
					"name": p.title,
					"current": current,
					"onclick": "router.path = '"+page[2]+"/"+p.id+"'"
				}, false);
			});
		}

		template("navEntry",
		{
			"name": page[0],
			"current": current,
			"dropdown": dropdown,
			"hasDropdown": "hasDropdown"
		});
	}

	function populateDropdowns(cb)
	{
		lib.callAPI("getPages", {}, function(result)
		{
			console.log(result);
			pages = pages.map(function(p)
			{
				if (typeof p[1] === "string")
				{
					return p;
				}
				else
				{
					p[1] = result.pages;
					return p;
				}
			});
			cb();
		});
	}
})();
