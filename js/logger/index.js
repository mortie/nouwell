var fs = require("fs");
var path = require("path");

module.exports = function(conf)
{
	this._logLevel = conf.log;
	this._dir = conf.dir;

	if (!fs.existsSync(this._dir))
		fs.mkdirSync(this._dir);
}

var errorStrings =
{
	"debug":   "Debug:   ",
	"info":    "Info:    ",
	"notice":  "Notice:  ",
	"warning": "Warning: ",
	"error":   "Error:   "
}

module.exports.prototype =
{
	"debug": function(msg, cb)
	{
		this._log("debug", msg, true, cb);
	},

	"info": function(msg, cb)
	{
		this._log("info", msg, true, cb);
	},

	"notice": function(msg, cb)
	{
		this._log("notice", msg, true, cb);
	},

	"warning": function(msg, cb)
	{
		this._log("warning", msg, true, cb);
	},

	"error": function(msg, err)
	{
		this._log("error", msg, err);
	},

	"_log": function(type, msg, err, cb)
	{
		//do nothing if this log type shouldn't be logged
		if (this._logLevel.indexOf(type) === -1)
			return false;

		//do nothing if there's no error
		if (!err)
			return false;

		//add raw error string if it exists
		if (err !== true)
			msg = msg+" ("+err+")";

		//add prefix
		msg = errorStrings[type]+msg;

		//write to console
		console.log(msg);

		//create time strings
		var date = new Date();
		var month = makeTwoDigits(date.getMonth());
		var day = makeTwoDigits(date.getDay());
		var hour = makeTwoDigits(date.getHours());
		var minute = makeTwoDigits(date.getMinutes());

		//prepare message string
		var msg = hour+":"+minute+" "+msg+" ("+err+")";

		//prepare file names
		var fileName = month+"."+day+".log";

		//append to file
		fs.appendFile(path.join(this._dir, fileName), msg+"\n", function(err)
		{
			if (err)
				throw new Error("Could not write to log dir! "+err);

			if (typeof cb === "function")
				cb();

			if (type === "error")
				process.exit();
		});
	}
}

//turn single digit numeric strings into two digits
function makeTwoDigits(num)
{
	//convert to string
	num = ""+num;

	//prepend a 0 if only 1 character
	if (num.length === 1)
		num = "0"+num;
	
	return num;
}
