(function()
{
	var fetchTemplate = function(path, callback)
	{
		xhr = new XMLHttpRequest();

		xhr.onload = function(e)
		{
			callback(xhr.response);
		}

		xhr.open("GET", path, true);
		xhr.send();
	}

	var replace = function(str, args)
	{
		var i;
		for (i in args)
		{
			str = str.split("{"+i+"}").join(args[i]);
		}

		return str;
	}

	var handleResult = function(result, arg3, params)
	{
		if (typeof arg3 == "function")
			arg3(result);
		else if (typeof arg3 == "string")
			document.getElementById(arg3).innerHTML += result;
		else if (arg3 instanceof HTMLElement)
			arg3.innerHTML += result;
		else if (!arg3 && params.defaultObject !== false)
			params.defaultObject.innerHTML += result;
	}

	window.Template = function(params)
	{
		if (!params)
			var params = {};

		var conf =
		{
			"location": params.location || "templates/",
			"postfix": params.postfix || ".html",
			"defaultObject": params.defautltObject || false
		}

		var cache = {};

		return function(name, args, arg3)
		{
			var result;
			if (cache[name])
			{
				handleResult(replace(cache[name], args), arg3, params);
			}
			else
			{
				fetchTemplate(conf.location+name+conf.postfix, function(result)
				{
					handleResult(replace(result, args), arg3, params);
					cache[name] = result;
				});
			}
		}
	}
})();
