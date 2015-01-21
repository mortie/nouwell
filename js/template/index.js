var path = require("path");
var fs = require("fs");

module.exports = function Template(conf)
{
	var suffix = conf.suffix;
	var templateDir = conf.path;

	return function template(name, args)
	{
		var fileName = path.join(templateDir, name+suffix);

		var str = fs.readFileSync(fileName, "utf8");
		var i;
		for (i in args)
		{
			str = str.split("{"+i+"}").join(args[i]);
		}

		//strip out non-existing args
		str = str.replace(/\{[a-zA-Z0-9]+\}/g, "");

		return str;
	}
}
