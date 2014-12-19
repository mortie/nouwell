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
		router.ready();

		lib.template("settings", settings);

		gui.onEditAndPause(".settingsEntry", function(element)
		{
			var key = element.getAttribute("data-key");

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
			gui.mediaSelect(function(fileName, title)
			{
				console.log(arguments);
				var key = element.getAttribute("data-key");

				lib.callAPI("updateSetting",
				{
					"key": key,
					"val": fileName
				}, function()
				{
					router.load();
				});
			});
		});

		gui.on(".delete", "click", function(element)
		{
			key = element.getAttribute("data-key");

			lib.callAPI("updateSetting",
			{
				"key": key,
				"val": false
			}, function()
			{
				router.load();
			});
		});
	}
});
