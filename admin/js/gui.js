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

	gui.onEditAndPause = function(query, cb)
	{
		var elements = document.querySelectorAll(query);

		var i;
		for (i=0; i<elements.length; ++i) (function()
		{
			var element = elements[i];
			var timeout;
			element.addEventListener("input", function(e)
			{
				clearTimeout(timeout);
				timeout = setTimeout(function()
				{
					cb(element, e);
				}, 500);
			});
		})();
	}

	gui.on = function(query, event, cb)
	{
		var elements = document.querySelectorAll(query);

		var i;
		for (i=0; i<elements.length; ++i) (function()
		{
			var element = elements[i];
			element.addEventListener(event, function(e)
			{
				cb(element, e);
			});
		})();
	}
})();
