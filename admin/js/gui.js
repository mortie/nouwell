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

			template("mediaSelect",
			{
				"entries": entries,
				"token": lib.apiToken
			});
		});
	}

	gui.mediaSelectUpdate = function(element)
	{
		gui.removeElement(element);
		gui.mediaSelect();
	}

	gui.mediaSelectSelection = function(path, title)
	{
		guiElement.innerHTML = "";
		editor.codemirror.doc.replaceSelection("!["+title+"]("+path+")");
	}

	gui.removeElement = function(element)
	{
		element.parentNode.removeChild(element);
	}
})();
