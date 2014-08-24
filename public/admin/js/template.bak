(function()
{
	var fetchTemplate = function(path, cb)
	{
		xhr = new XMLHttpRequest();

		xhr.onload = function(e)
		{
			cb(xhr.response);
		}

		xhr.open("GET", path, true);
		xhr.send();
	}

	var replace = function(str, args)
	{
		if (args)
		{
			var i;
			for (i in args)
			{
				str = str.split("{"+i+"}").join(args[i]);
			}
		}

		return str;
	}

	var handleResult = function(result, params)
	{
		params.element.innerHTML += result;
	}

	window.Template = function(params)
	{
		if (!params)
			var params = {};

		var conf =
		{
			"location": params.location || "templates/",
			"postfix": params.postfix || ".html",
			"element": params.element
		}

		var cache = {};

		return function(name, args, cb)
		{
			var result;
			if (cache[name])
			{
				handleResult(replace(cache[name], args), params);
				if (typeof cb === "function")
					cb();
			}
			else
			{
				fetchTemplate(conf.location+name+conf.postfix, function(result)
				{
					handleResult(replace(result, args), params);
					cache[name] = result;
					if (typeof cb === "function")
						cb();
				});
			}
		}
	}
})();
