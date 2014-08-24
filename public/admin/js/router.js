(function()
{
	window.Router = function(element)
	{
		this._pages = [];
		this._page = "";
		this._element = element;
		this._enabled = true;

		this._callbacks = {};

		window.onpopstate = function()
		{
			if (this._enabled)
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
			if (!this._enabled) return false;

			this._page = path.split("/")[0];
			location.hash = path;
		},

		get page()
		{
			return this._page || location.hash.split("/")[0].substring(1);
		},

		"disable": function()
		{
			this._enabled = false;
		},

		"enable": function()
		{
			this._enabled = true;
		},

		"addPage": function(name, f)
		{
			this._pages[name] = f;
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
