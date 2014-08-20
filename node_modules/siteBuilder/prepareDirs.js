var fs = require("fs");
var mkdirp = require("mkdirp");

//list of directories to prepare
var dirs =
[
	"{outDir}",
	"{outDir}/admin",
	"{outDir}/media",
	"{themeDir}",
	"{templateDir}"
];

module.exports = function(cb)
{
	var self = this;

	//loop through desired dirs, creating them
	dirs.forEach(function(dir)
	{
		//replace placeholders
		var path = dir.split("{outDir}").join(self.outDir)
		              .split("{themeDir}").join(self.themeDir)
		              .split("{templateDir}").join(self.templateDir);

		//create directory
		try
		{
			//mkdirp to create paretn dirs if necessary
			mkdirp.sync(path);
		}
		catch (err)
		{
			self.logger.error("Could not create "+path+".", err);
		}
	});

	cb();
}
