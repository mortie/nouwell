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
	"_query": function()
	{
		//interpret arguments
		var shouldEscape = arguments[0];
		var name = arguments[1];
		if (arguments[3] === undefined)
		{
			var args = false;
			var cb = arguments[2];
		}
		else
		{
			var args = arguments[2];
			var cb = arguments[3];
		}

		var str = this._caches[name];

		if (str === undefined)
		{
			str = fs.readFileSync(this._templatesPath+name+".sql", "utf8");
			this._caches[name] = str;
		}

		if (args)
		{
			var i;
			if (shouldEscape)
			{
				for (i in args)
					str = str.split("{"+i+"}").join(this._conn.escape(args[i]));
			}
			else
			{
				for (i in args)
					str = str.split("{"+i+"}").join(args[i]);
			}
		}

		this._conn.query(str, cb);
	},

	"query": function()
	{
		this._query(true, arguments[0], arguments[1], arguments[2]);
	},
	
	"queryNoEscape": function()
	{
		this._query(false, arguments[0], arguments[1], arguments[2]);
	}
}
