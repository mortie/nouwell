var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

module.exports = function writeFiles(cb)
{
	var self = this;

	self.logger.debug("Writing files");

	var first = true;

	self.tree.forEach(function loopParents(page)
	{
		if (page.children.length)
		{
			page.children.forEach(function loopChildren(child)
			{
				var menu = buildMenu(page, child, self);
				buildPage(page.slug+"/"+child.slug, child, menu, self, first);
				first = false;
			});
		}

		if (!page.children.length)
		{
			var menu = buildMenu(page, false, self);
			buildPage(page.slug, page, menu, self, first);
		}
		else
		{
			var menu = buildMenu(page, page.children[0], self);
			buildPage(page.slug, page.children[0], menu, self);
		}
		first = false;
	});

	cb();
}

function buildMenu(page, child, self)
{
	var menuPages = "";
	self.tree.forEach(function menuLoopParents(cPage)
	{
		var dropdown = "";
		cPage.children.forEach(function menuLoopChildren(cChild)
		{
			if (child === cChild)
				var current = "current";
			else
				var current = "";

			dropdown += self.template("menuPageDropdown",
			{
				"url": cPage.slug+"/"+cChild.slug,
				"title": cChild.title,
				"current": current
			});
		});

		if (page === cPage)
			var current = "current";
		else
			var current = "";

		menuPages += self.template("menuPage",
		{
			"url": cPage.slug,
			"title": cPage.title,
			"dropdown": dropdown,
			"current": current
		});
	});

	if (self.headerImage)
	{
		var headerImage = self.template("menuHeaderImage",
		{
			"url": "/_media/"+self.headerImage
		});
	}
	else
	{
		var headerImage = "";
	}

	return self.template("menu",
	{
		"pages": menuPages,
		"headerImage": headerImage
	});
}

function buildPage(dirPath, page, menu, self, first)
{
	var posts = "";
	page.posts.forEach(function buildLoopParents(post)
	{
		var url = dirPath+"/"+post.slug;
		if (url[0] === "/") url = url.substring(1);

		self.logger.info("Building "+post.title+"...");
		var e = self.template("post",
		{
			"url": url,
			"title": post.title,
			"content": post.html
		});

		posts += e;

		var p = self.template("index",
		{
			"menu": menu,
			"posts": e,
			"postTitle": post.title,
			"siteTitle": self.title,
		}, false);

		write(dirPath+"/"+post.slug, p, self);
	});

	var p = self.template("index",
	{
		"menu": menu,
		"posts": posts,
		"postTitle": page.title,
		"siteTitle": self.title
	}, false);

	write(dirPath, p, self);
	if (first)
		write("", p, self);
}

function write(dirPath, content, self)
{
	dirPath = path.join(self.outDir, dirPath);

	try
	{
		mkdirp.sync(dirPath);
	}
	catch (err)
	{
		self.logger.error("Couldn't create directory "+dirPath+".", err);
	}

	var fileName = path.join(dirPath, "index.html");

	++self.cbs;
	fs.writeFile(fileName, content, function fileWritten(err)
	{
		self.logger.error("Couldn't write file.", err);

		--self.cbs;
	});
}
