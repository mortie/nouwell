router.addPanel("update", function()
{
	var updates;
	var async = new lib.Async(2, draw);

	lib.template.load(["update", "updateEntry"], async);

	lib.callAPI("getUpdates", {}, function(result)
	{
		updates = result.updates;
		async();
	});

	function draw()
	{
		var entries = "";

		if (updates)
		{
			updates.forEach(function(update)
			{
				entries += lib.template("updateEntry",
				{
					"version": update.version,
					"description": update.description
				}, false);
			});
		}
		else
		{
			entries = "No updates available.";
		}

		lib.template("update",
		{
			"updates": entries
		});

		if (!updates)
			document.getElementById("update").className = "hidden";

		gui.on("#update", "click", function()
		{
			lib.callAPI("update", {}, function(response)
			{
				console.log("Updated.");
				document.getElementById("output").innerHTML = response.output;
			});
		});
	}
});
