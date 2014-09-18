router.addPanel("update", function()
{
	var updates;
	var async = new lib.Async(2, draw);

	lib.template.load(["update", "updateEntry"], async);

	lib.callAPI("getUpdates", {}, function(result)
	{
		console.log(result.updates);
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

		gui.on("#update", "click", function()
		{
			console.log("update");
		});
	}
});
