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

		var elements = document.querySelectorAll(".settingsEntry");

		var i;
		for (i=0; i<elements.length; ++i)
		{
			gui.onEditAndPause(elements[i], function(element)
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
		};
	}
});
