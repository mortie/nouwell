module.exports = function(cb)
{
	var self = this;

	var first = true;

	self.tree.forEach(function(category)
	{
		buildCategory(category, first, self);

		first = false;
	});

	cb();
}

function buildCategory(category, first, self)
{
	var menu = buildMenu(category, self);

	var allEntries = "";
	category.entries.forEach(function(entry)
	{
		var e = self.template("entry",
		{
			"title": entry.title,
			"content": entry.html
		});

		allEntries += e;

		var page = self.template("index",
		{
			"menu": menu,
			"content": e,
			"pageTitle": self.title,
			"postTitle": entry.title
		});

		self.logger.info("Writing entry '"+entry.title+"'...");

		write(category.name, entry.slug, page, self);
	});

	var page = self.template("index",
	{
		"menu": menu,
		"content": allEntries,
		"pageTtile": self.title,
		"postTitle": category.name
	});

	write(category.name, "", page, self);

	if (first)
		write("", "", page, self);
}

function write(category, name, content, self)
{
	var dir = self.path.join(self.outDir, category);
	var path = self.path.join(self.outDir, category, name);

	if (!self.fs.existsSync(dir))
		self.fs.mkdirSync(dir);

	if (!self.fs.existsSync(path))
		self.fs.mkdirSync(path);

	var fileName = self.path.join(path, "index.html");

	++self.cbs;
	self.fs.writeFile(fileName, content, function(err)
	{
		self.logger.error("Oh noes!", err);

		--self.cbs;
	});
}

function buildMenu(category, self)
{
	var menuEntries = "";
	self.tree.forEach(function(c)
	{
		if (c === category)
			var current = true;
		else
			var current = false;

		menuEntries += self.template("menuEntry",
		{
			"name": c.name,
			"current": current
		});
	});

	return self.template("menu",
	{
		"entries": menuEntries
	});
}
