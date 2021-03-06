router.addPanel("media", function()
{
	var media;

	var async = new lib.Async(2, draw);

	lib.template.load(["media", "mediaEntry"], async);

	lib.callAPI("getMedia", {}, function(results)
	{
		media = results.media;
		async();
	});

	function draw()
	{
		router.ready();

		var entries = "";
		for (var i in media)
		{
			var entry = media[i];
			entries += lib.template("mediaEntry",
			{
				"title": entry.title,
				"id": entry.id,
				"extension": entry.extension
			}, false);
		};

		lib.template("media",
		{
			"entries": entries,
			"token": lib.apiToken
		});

		gui.onEditAndPause(".entries .entry .name", function(element)
		{
			var id = element.getAttribute("data-id");
			lib.callAPI("updateMediaTitle",
			{
				"id": id,
				"title": element.value
			},
			function(result)
			{
				console.log(result);
			});
		});

		gui.on(".entries .entry .delete", "click", function(element)
		{
			var id = element.getAttribute("data-id");
			lib.callAPI("deleteMedia",
			{
				"id": id
			},
			function(result)
			{
				router.load();
			});
		});
	}
});
