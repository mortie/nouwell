var path = require("path");
var fs = require("fs");

module.exports = function(conf)
{
	var suffix = conf.suffix;
	var templateDir = conf.path;

	return function(name, args)
	{
		var fileName = path.join(templateDir, name+suffix);

		var str = fs.readFileSync(fileName, "utf8");
		var i;
		for (i in args)
		{
			str = str.split("{"+i+"}").join(args[i]);
		}

		str = "<!--start: "+name+"-->\n"+str+"<!--end: "+name+"-->";

		return str;
	}
}
