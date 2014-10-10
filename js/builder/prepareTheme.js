var fs = require("fs");
var path = require("path");

module.exports = function(cb)
{
	var self = this;

	//css
	compileToFile(path.join(self.themeDir, "css"), path.join(self.outDir, "style.css"), self);

	//js
	compileToFile(path.join(self.themeDir, "js"), path.join(self.outDir, "script.js"), self,
		"(function(){\n",
		"})();\n\n"
	);

	//img
	++self.cbs;
	fs.readdir(path.join(self.themeDir, "img"), function(err, files)
	{
		self.logger.notice("Can't read theme dir's 'img' dir.", err);

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

function compileToFile(from, to, self, prefix, postfix)
{
	prefix = prefix || "";
	postfix = postfix || "";

	++self.cbs;
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
