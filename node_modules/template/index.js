var path = require("path");

module.exports = function(conf)
{
	var path = conf.path;
	var suffix = conf.suffix;

	return function(name, args)
	{
		var str = fs.readFileSync(path.join(path, name+suffix));
		var i;
		for (i in args)
			str.split("{"+i+"}").join(args[i]);

		return str;
	}
}
