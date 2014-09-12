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

	lib.template.load(["settings"], function()
	{
		--callbacks;
		if (callbacks === 0)
			draw();
	});

	function draw()
	{
		lib.template("settings", settings);

		gui.onEditAndPause(".settingsEntry", function(element)
		{
			var key = element.className.split(/\s+/)[0];

			lib.callAPI("updateSetting",
			{
				"key": key,
				"val": element.value
			},
			function(result)
			{
				console.log(result)
			});
		});
	}
});
