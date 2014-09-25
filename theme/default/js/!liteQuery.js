window.$ = function()
{
	if (arguments[1])
	{
		var p = arguments[0];
		var str = arguments[1];
	}
	else
	{
		var p = document;
		var str = arguments[0];
	}

	if (str)
	{
		var rawElements = p.querySelectorAll(str);

		var elements = [];
		var i;
		for (i=0; i<rawElements.length; ++i)
			elements[i] = rawElements[i];
	}
	else
	{
		elements = [window];
	}

	elements.on = function(e, func)
	{
		elements.forEach(function(element)
		{
			element.addEventListener(e, function(e)
			{
				func(element, e);
			}, false);
		});

		return elements;
	}

	return elements;
}
