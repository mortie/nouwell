(function()
{
	var guiElement = document.getElementById("gui");
	var template = new Template(
	{
		"element": guiElement
	});

	template.load(
	[
		"mediaSelect",
		"mediaSelectEntry",
		"uploadMedia"
	]);

	window.gui = {};

	//TODO: fix this
	gui.error = function(message)
	{
		alert(message);
	}

	//TODO: fix this
	gui.notify = function(message)
	{
		alert(message);
	}

	gui.mediaSelect = function()
	{
		lib.callAPI("getMedia", {}, function(result)
		{
			if (!result.success)
			{
				gui.error("Error! "+result.error);
				console.log(result);
				return;
			}
			var entries = "";
			result.media.forEach(function(entry)
			{
				entries += template("mediaSelectEntry",
				{
					"title": entry.title,
					"id": entry.id,
					"extension": entry.extension
				}, false);
			});

			var upload = template("uploadMedia",
			{
				"token": lib.apiToken,
				"onload": "gui.updateMediaSelect()"
			}, false);

			template("mediaSelect",
			{
				"entries": entries,
				"upload": upload
			});
		});
	}

	gui.updateMediaSelect = function()
	{
		guiElement.innerHTML = "";
		gui.mediaSelect();
	}
})();
