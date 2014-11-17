router.addPanel("plugins", function(args)
{
	var async = new lib.Async(2, draw);

	var plugins = [];

	lib.template.load(["plugins", "pluginEntry"], async);

	lib.callAPI("getPlugins", {}, function(res)
	{
		plugins = res.plugins;
		async();
	});

	function draw()
	{
		router.ready();

		var pluginEntries = "";
		plugins.forEach(function(plugin)
		{
			pluginEntries += lib.template("pluginEntry",
			{
				"name": plugin
			}, false);
		});

		lib.template("plugins",
		{
			"entries": pluginEntries
		});
	}
});
