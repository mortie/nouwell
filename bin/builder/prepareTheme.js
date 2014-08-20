var fs = require("fs");
var path = require("path");

module.exports = function(cb)
{
	var self = this;

	//read all css file and write them to a style.css
	++self.cbs;
	fs.readdir(self.themeDir, function(err, files)
	{
		self.logger.error(err);

		//loop over css files
		var css = "";
		files.forEach(function(file)
		{
			try
			{
				var str = fs.readFileSync(path.join(self.themeDir, file));
			}
			catch (err)
			{
				self.logger.error(err);
			}

			css += "/* "+file+" */\n"+str+"\n";
		});

		//write the contents of the css files to style.css
		++self.cbs;
		fs.writeFile(path.join(self.outDir, "style.css"), css, function(err)
		{
			self.logger.error(err);

			--self.cbs;
		});

		--self.cbs;
	});
	cb();
}
