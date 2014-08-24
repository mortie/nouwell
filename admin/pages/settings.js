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
		lib.template("settings", settings);
	}
});
