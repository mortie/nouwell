router.addPage("settings", function()
{
	var settings;

	var callbacks = 2;

	lib.callAPI("getSettings", {}, function(result)
	{
		settings = result.settings;

		--callbacks;
		if (callbacks === 0)
			draw();
	});

	lib.template.load(["settings", "settingsEntry"], function()
	{
		--callbacks;
		if (callbacks === 0)
			draw();
	});

	function draw()
	{
		var entries = "";
		var i;
		for (i in settings)
		{
			entries += lib.template("settingsEntry",
			{
				"key": i,
				"value": settings[i]
			}, false);
		}

		lib.template("settings",
		{
			"entries": entries
		});
	}
});
