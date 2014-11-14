var fs = require("fs");
var path = require("path");

function Async(count, cb)
{
	return function()
	{
		--count;
		if (count == 0)
			cb();
	}
}

module.exports = function(cb)
{
	var self = this;

	var jsPrefix = "(function(){\n";
	var jsPostfix = "})();\n\n"

	//css
	++self.cbs
	fs.readdir(self.pluginDir, function(err, plugins)
	{
		var cssCompiled = "";
		var jsCompiled = "";

		//write things after the CSS is compiled
		++self.cbs;
		var cssAsync = new Async(plugins.length+1, function()
		{
			fs.writeFile(path.join(self.outDir, "style.css"), cssCompiled, function(err)
			{
				self.logger.error("Could not write style.css.", err);
				--self.cbs;
			});
		});

		//write things after the JS is compiled
		++self.cbs;
		var jsAsync = new Async(plugins.length+2, function()
		{
			fs.writeFile(path.join(self.outDir, "script.js"), jsCompiled, function(err)
			{
				self.logger.error("Could not write script.js.", err);
				--self.cbs;
			});
		});

		//theme css
		compile(path.join(self.themeDir, "css"), self, function(res)
		{
			cssCompiled += res;
			cssAsync();
		});

		//common js
		compile(path.join("js", "client"), self, function(res)
		{
			jsCompiled += res;
			jsAsync();

			//theme js
			compile(path.join(self.themeDir, "js"), self, function(res)
			{
				jsCompiled += res;
				jsAsync();
			}, jsPrefix, jsPostfix);

			//loop over plugins
			plugins.forEach(function(plugin)
			{
				var cssPath = path.join(self.pluginDir, plugin, "css");
				var jsPath = path.join(self.pluginDir, plugin, "js");

				//css
				compile(cssPath, self, function(res)
				{
					cssCompiled += res;
					cssAsync();
				});

				//js
				compile(jsPath, self, function(res)
				{
					jsCompiled += res;
					jsAsync();
				}, jsPrefix, jsPostfix);
			});
		}, jsPrefix, jsPostfix);

		//loop over plugins
		plugins.forEach(function(plugin)
		{
			var cssPath = path.join(self.pluginDir, plugin, "css");
			var jsPath = path.join(self.pluginDir, plugin, "js");

			//css
			compile(cssPath, self, function(res)
			{
				cssCompiled += res;
				cssAsync();
			});

			//js
			compile(jsPath, self, function(res)
			{
				jsCompiled += res;
				jsAsync();
			}, jsPrefix, jsPostfix);
		});
		--self.cbs;
	});

	//img
	++self.cbs;
	fs.readdir(path.join(self.themeDir, "img"), function(err, files)
	{
		if (err)
			self.logger.notice("Can't read theme dir's 'img' dir.");

		if (files)
		{
			files.forEach(function(file)
			{
				++self.cbs;

				var newFile = fs.createWriteStream(path.join(self.outDir, "_img", file));
				var oldFile = fs.createReadStream(path.join(self.themeDir, "img", file));

				oldFile.pipe(newFile);

				oldFile.on("end", function()
				{
					--self.cbs;
				});
			});
		}

		--self.cbs;
	});

	cb();
}

function compile(from, self, cb, prefix, postfix)
{
	prefix = prefix || "";
	postfix = postfix || "";

	fs.readdir(from, function(err, files)
	{
		self.logger.error("Couldn't read theme dir.", err);

		files.sort(function(a, b)
		{
			if (a[0] === "!" && b[0] !== "!")
				return -1;
			else if (a[0] !== "!" && b[0] === "!")
				return 1;
			else
				return 0;
		});

		//loop over files files
		var compiled = "";
		files.forEach(function(file)
		{
			try
			{
				var str = fs.readFileSync(path.join(from, file));
			}
			catch (err)
			{
				self.logger.error(err);
			}

			compiled += prefix+str+postfix;
		});

		//return contents of the files
		cb(compiled);
	});
}
