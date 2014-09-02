module.exports = function(cb)
{
	var self = this;

	var first = true;

	self.tree.forEach(function(page)
	{
		buildPage(page, first, self);

		first = false;
	});

	cb();
}

function buildPage(page, first, self)
{
	var menu = buildMenu(page, self);

	var allEntries = "";
	page.entries.forEach(function(entry)
	{
		var e = self.template("entry",
		{
			"title": entry.title,
			"content": entry.html,
			"category": page.slug,
			"slug": entry.slug
		});

		allEntries += e;

		var p = self.template("index",
		{
			"menu": menu,
			"content": e,
			"pageTitle": self.title,
			"postTitle": entry.title
		});

		self.logger.info("Writing entry '"+entry.title+"'...");

		write(page.slug, entry.slug, p, self);
	});

	var p = self.template("index",
	{
		"menu": menu,
		"content": allEntries,
		"pageTitle": self.title,
		"postTitle": page.title
	});

	write(page.slug, "", p, self);

	if (first)
		write("", "", p, self);
}

function write(page, name, content, self)
{
	var dir = self.path.join(self.outDir, page);
	var path = self.path.join(self.outDir, page, name);

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
			var current = "current";
		else
			var current = "";

		menuEntries += self.template("menuEntry",
		{
			"title": c.title,
			"slug": c.slug,
			"current": current
		});
	});

	return self.template("menu",
	{
		"entries": menuEntries
	});
}
