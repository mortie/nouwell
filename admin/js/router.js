(function()
{
	window.Router = function(element)
	{
		this._pages = [];
		this._page = "";
		this._element = element;

		this._callbacks = {};

		window.onpopstate = function()
		{
			this.load();
		}.bind(this);
	}

	window.Router.prototype =
	{

		get path()
		{
			return location.hash.substring(1);
		},

		set path(path)
		{
			this._page = path.split("/")[0];
			location.hash = path;
		},

		get page()
		{
			return this._page || location.hash.split("/")[0].substring(1);
		},

		"addPage": function(name, f)
		{
			this._pages[name] = f;
		},

		"init": function()
		{
			this.load(true);
		},

		"load": function(first)
		{
			var path = location.hash.substring(1);

			var sections = path.split("/");
			var page = sections[0];

			//prepare element
			this._element.className = page;
			this._element.innerHTML = "";

			//execute page script
			this._pages[page](sections);

			this._emit("load", [first || false]);
		},

		"on": function(e, func)
		{
			if (this._callbacks[e] === undefined)
				this._callbacks[e] = [];

			this._callbacks[e].push(func);
		},

		"_emit": function(e, args)
		{
			if (this._callbacks[e] !== undefined)
			{
				this._callbacks[e].forEach(function(func)
				{
					func.apply(null, args || []);
				});
			}
		}
	}
})();
