var fs = require("fs");
var path = require("path");

module.exports = function(cb)
{
	var self = this;

	compileToFile(self.themeDir, path.join(self.outDir, "style.css"), self);

	compileToFile(self.jsDir, path.join(self.outDir, "script.js"), self,
		"(function(){\n",
		"})();\n\n"
	);

	cb();
}

function compileToFile(from, to, self, prefix, postfix)
{
	prefix = prefix || "";
	postfix = postfix || "";

	++self.cbs;
	fs.readdir(from, function(err, files)
	{
		self.logger.error(err);

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

		//write the contents of the files
		++self.cbs;
		fs.writeFile(to, compiled, function(err)
		{
			self.logger.error(err);

			--self.cbs;
		});

		--self.cbs;
	});
}
