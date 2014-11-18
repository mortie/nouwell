router.addPanel("plugins", function(args)
{
	if (args[1] == "edit")
		edit();
	else
		list();

	function edit()
	{
		var async = new lib.Async(2, draw);

		console.log(draw.toString());

		var conf = "";

		lib.template.load(["pluginConfEdit"], async);

		lib.callAPI("getPluginConf",
		{
			"plugin": args[2]
		}, function(res)
		{
			conf = res.conf;
			console.log(res);
			async();
		});

		function draw()
		{
			router.ready();

			lib.template("pluginConfEdit",
			{
				"conf": conf
			});

			gui.onEditAndPause(".conf", function(element)
			{
				lib.callAPI("updatePluginConf",
				{
					"conf": element.value,
					"plugin": args[2]
				});
			});

			//handle tab key
			gui.on(".conf", "keydown", function(element, e)
			{
				if (e.keyCode == 9)
				{
					var start = element.selectionStart;
					var end = element.selectionEnd;

					element.value = element.value.substring(0, start)+
					                "\t"+
					                element.value.substring(end);

					element.selectionStart = element.selectionEnd = start + 1;

					e.preventDefault();
				}
			});
		}
	}

	function list()
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

			if (pluginEntries == "")
				pluginEntries = "You have no plugins.";

			lib.template("plugins",
			{
				"entries": pluginEntries
			});

			gui.on(".entry .name", "click", function(element)
			{
				router.path = "plugins/edit/"+element.getAttribute("data-name");
			});
		}
	}
});
