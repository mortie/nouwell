var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

module.exports = function(cb)
{
	var self = this;

	var first = true;

	self.tree.forEach(function(page)
	{
		if (page.children.length)
		{
			page.children.forEach(function(child)
			{
				var menu = buildMenu(page, child, self);
				buildPage(page.slug+"/"+child.slug, child, menu, self);
			});
		}

		var menu = buildMenu(page, false, self);

		buildPage(page.slug, page, menu, self);
		if (first)
			buildPage("", page, menu, self);

		first = false;
	});

	cb();
}

function buildMenu(page, child, self)
{
	var menuEntries = "";
	self.tree.forEach(function(cPage)
	{
		var dropdown = "";
		cPage.children.forEach(function(cChild)
		{
			if (child === cChild)
				var current = "current";
			else
				var current = "";

			dropdown += self.template("menuEntryDropdown",
			{
				"slug": cPage.slug+"/"+cChild.slug,
				"title": cChild.title,
				"current": current
			});
		});

		if (page === cPage)
			var current = "current";
		else
			var current = "";

		menuEntries += self.template("menuEntry",
		{
			"slug": cPage.slug,
			"title": cPage.title,
			"dropdown": dropdown,
			"current": current
		});
	});

	return self.template("menu",
	{
		"entries": menuEntries
	});
}

function buildPage(dirPath, page, menu, self)
{
	var entries = "";
	page.entries.forEach(function(entry)
	{
		var e = self.template("entry",
		{
			"url": dirPath+"/"+entry.slug,
			"title": entry.title,
			"content": entry.html
		});

		entries += e;

		var p = self.template("index",
		{
			"menu": menu,
			"entries": e
		});

		write(dirPath+"/"+entry.slug, p, self);
	});

	var p = self.template("index",
	{
		"menu": menu,
		"entries": entries
	});

	write(dirPath, p, self);
}

function write(dirPath, content, self)
{
	dirPath = path.join(self.outDir, dirPath);
	console.log(dirPath);

	try
	{
		mkdirp.sync(dirPath);
	}
	catch (err)
	{
		self.logger.error("Couldn't create directory "+dirPath, err);
	}

	var fileName = path.join(dirPath, "index.html");

	++self.cbs;
	fs.writeFile(fileName, content, function(err)
	{
		self.logger.error("Oh noes!", err);

		--self.cbs;
	});
}
