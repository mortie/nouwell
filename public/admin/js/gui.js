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
			for (var i in result.media)
			{
				var entry = result.media[i];

				entries += template("mediaSelectEntry",
				{
					"title": entry.title,
					"id": entry.id,
					"extension": entry.extension
				}, false);
			}

			template("mediaSelect",
			{
				"entries": entries,
				"token": lib.apiToken
			});

			gui.on(".mediaSelect .entry .thumbnail", "click", function(element)
			{
				var title = element.getAttribute("data-title");
				var fileName = element.getAttribute("data-fileName");
				gui.clearElement(guiElement);
				cb(fileName, title);
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
			}, false);
		})();
	}

	function onTap(element, cb)
	{
		var startX;
		var startY;

		element.addEventListener("touchstart", function(e)
		{
			startX = e.pageX;
			startY = e.pageY;
			e.preventDefault();
		}, false);

		element.addEventListener("touchend", function(e)
		{
			if ((Math.abs(startX - e.pageX) < 32)
			&&  (Math.abs(startY - e.pageY) < 32))
			{
				cb(e);
			}
		}, false);
	}

	gui.on = function(query, event, cb)
	{
		var elements = document.querySelectorAll(query);

		var i;
		for (i=0; i<elements.length; ++i) (function()
		{
			var element = elements[i];

			if (typeof event === "string")
			{
				addListener(element, event, cb);
			}
			else
			{
				event.forEach(function(e)
				{
					addListener(element, e, cb);
				});
			}
		})();

		function addListener(element, event, cb)
		{
			var shouldClick = true;

			if (event === "click" && !("ontouchstart" in document.documentElement))
			{
				element.addEventListener(event, function(e)
				{
					if (shouldClick)
						cb(element, e);
					else
						shouldClick = true;
				}, false);
			}
			else if (event === "click")
			{
				onTap(element, function(e)
				{
					shouldClick = false;
					cb(element, e);
				});
			}
			else
			{
				element.addEventListener(event, function(e)
				{
					cb(element, e);
				});
			}
		}
	}
})();
