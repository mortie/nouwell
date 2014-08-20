var ncp = require("ncp").ncp;
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");

//list of directories to prepare
var dirs =
[
	"{outDir}",
	"{outDir}/admin",
	"{outDir}/media",
	"{themeDir}",
	"{templateDir}",
	"{adminDir}"
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
		              .split("{templateDir}").join(self.templateDir)
		              .split("{adminDir}").join(self.adminDir);

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

	//copy admin dir to {outDir}/admin asynchronously.
	++self.cbs;
	ncp(self.adminDir, self.outDir+"/admin", function(err)
	{
		self.logger.error("Could not copy admin dir.", err);

		--self.cbs;
	});

	cb();
}
