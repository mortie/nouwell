(function()
{
	window.Template = function(conf)
	{
		var prefix = conf.prefix || "templates/";
		var postfix = conf.postfix || ".html";
		var element = conf.element || null;

		var cache = {};

		var template = function(name, args, modifyElement)
		{
			var str = cache[name] || "";

			if (args)
			{
				var i;
				for (i in args)
					str = str.split("{"+i+"}").join(args[i]);
			}

			//remove arguments which aren't provided
			var str = str.replace(/\{[a-zA-Z0-9]+\}/g, "");

			if (element && modifyElement !== false)
				element.innerHTML += str;

			return str;
		}

		template.load = function(templates, cb)
		{
			var n = 0;
			var loaded = false;
			templates.forEach(function(t)
			{
				if (cache[t] === undefined)
				{
					loaded = true;
					++n;
					load(prefix+t+postfix, t, function(result, t)
					{
						cache[t] = result;
						--n;

						if (n === 0 && typeof cb === "function")
							cb();
					});
				}
			});

			if (!loaded && typeof cb === "function")
				cb();
		}

		return template;
	}

	function load(path, t, cb)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("get", path);
		xhr.send();
		xhr.onload = function()
		{
			cb(xhr.responseText, t);
		}
	}
})();
