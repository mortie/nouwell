var fs = require("fs");
var mysql = require("mysql");

module.exports = function(conf)
{
	//create connection and connect
	this._conn = mysql.createConnection(
	{
		"host": conf.host,
		"port": conf.port,
		"user": conf.username,
		"password": conf.password,
		"multipleStatements": true,
		"charset": "utf8_unicode_ci"
	});
	this._conn.connect();

	this._caches = {};
	this._templatesPath = __dirname+"/templates/";
}

module.exports.prototype =
{
	"query": function(name, args, cb)
	{
		//if no arguments, callback should become the second argument
		if (cb == undefined)
			cb = arguments[1];

		var str = this._caches[name];

		if (str === undefined)
		{
			str = fs.readFileSync(this._templatesPath+name+".sql", "utf8");
			this._caches[name] = str;
		}

		if (cb !== undefined)
		{
			var i;
			for (i in args)
				str = str.split("{"+i+"}").join(this._conn.escape(args[i]));
		}

		this._conn.query(str, cb);
	}
}
