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

	gui.mediaSelect = function(cb)
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

			gui.on(".mediaSelect .entry .thumbnail", "click", function(element)
			{
				var className = element.className.split(/\s+/);
				var title = className[1];
				var path = className[2];
				gui.clearElement(guiElement);
				cb(path, title);
			});
		});
	}

	gui.mediaSelectUpdate = function(element)
	{
		gui.clearElement(guiElement);
		gui.mediaSelect();
	}

	gui.removeElement = function(element)
	{
		element.parentNode.removeChild(element);
	}

	gui.clearElement = function(element)
	{
		while (element.firstChild)
			element.removeChild(element.firstChild);
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
