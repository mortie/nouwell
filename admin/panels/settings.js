router.addPanel("settings", function()
{
	var settings;

	var async = new lib.Async(2, draw);

	lib.callAPI("getSettings", {}, function(result)
	{
		settings = result.settings;
		async();
	});

	lib.template.load(["settings"], async);

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

		gui.on(".mediaSelect", "click", function(element)
		{
			gui.mediaSelect(function(path, title)
			{
				var key = element.className.split(/\s+/)[0];

				lib.callAPI("updateSetting",
				{
					"key": key,
					"val": path
				});

				router.load();
			});
		});
	}
});
