(function()
{
	window.Router = function(element)
	{
		this._panels = {};
		this._panel = "";
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

			this._panel = path.split("/")[0];
			location.hash = path;
		},

		get element()
		{
			return this._element;
		},

		get panel()
		{
			return this._panel || location.hash.split("/")[0].substring(1);
		},

		"disable": function()
		{
			this._enabled = false;
		},

		"enable": function()
		{
			this._enabled = true;
		},

		"addPanel": function(name, f)
		{
			this._panels[name] = f;
		},

		"load": function(first)
		{
			var path = location.hash.substring(1);

			var sections = path.split("/");
			var panel = sections[0];

			//prepare element
			this._element.className = path.replace(/\//g, " ");
			this._element.innerHTML = "";

			console.log("loading '"+panel+"'");

			//execute page script
			this._panels[panel](sections);

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
