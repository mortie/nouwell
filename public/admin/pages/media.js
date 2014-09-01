router.addPage("media", function()
{
	var callbacks = 2;

	var media;

	lib.template.load(["media", "mediaEntry"], function()
	{
		--callbacks;
		if (callbacks === 0) draw();
	});

	lib.callAPI("getMedia", {}, function(results)
	{
		media = results.media;

		--callbacks;
		if (callbacks === 0) draw();
	});

	function draw()
	{
		var entries = "";
		media.forEach(function(entry)
		{
			entries += lib.template("mediaEntry",
			{
				"title": entry.title,
				"id": entry.id,
				"extension": entry.extension
			}, false);
		});

		lib.template("media",
		{
			"entries": entries,
			"token": lib.apiToken
		});

		var inputElements = document.querySelectorAll(".entries .entry .name");
		
		var i;
		for (i=0; i<inputElements.length; ++i)
		{
			gui.onEditAndPause(inputElements[i], function(element)
			{
				var id = element.className.split(/\s+/)[0];
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
		}

		var deleteElements = document.querySelectorAll(".entries .entry .delete");
		for (i=0; i<deleteElements.length; ++i)
		{
			//create scope
			(function()
			{
				var element = deleteElements[i];
				element.addEventListener("click", function()
				{
					var id = element.className.split(/\s+/)[0];
					lib.callAPI("deleteMedia",
					{
						"id": id
					},
					function(result)
					{
						router.load();
					});
				});
			})();
		}
	}
});