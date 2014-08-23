(function()
{
	window.Router = function(element, onload)
	{
		this._pages = [];
		this._element = element;
		this._onload = onload;

		window.onpopstate = this.load.bind(this);
	}

	window.Router.prototype =
	{
		get path()
		{
			return location.hash.substring(1);
		},

		set path(path)
		{
			console.log("switching to page "+path);
			location.hash = path;
			this.load();
		},

		"addPage": function(name, f)
		{
			this._pages[name] = f;
		},

		"init": function()
		{
			if (this._onload)
				this._onload(true);
		},

		"load": function()
		{
			var path = location.hash.substring(1);

			var sections = path.split("/");
			var page = sections[0];

			//prepare element
			this._element.innerHTML = "";
			this._element.className = page;

			//execute page script
			this._pages[page](sections);

			if (this._onload)
				this._onload(false);
		}
	}
})();
