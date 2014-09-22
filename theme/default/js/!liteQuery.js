window.$ = function(str)
{
	if (str)
	{
		var rawElements = document.querySelectorAll(str);

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
