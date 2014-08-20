var fs = require("fs");
var path = require("path");

module.exports = function(conf)
{
	this.log = conf.log;
	this.dir = conf.dir;
}

module.exports.prototype =
{
	"info": function(message, err)
	{
		this._log("info", msg, err);
	},

	"notice": function(msg, err)
	{
		this._log("notice", msg, err);
	},

	"warning": function(msg, err)
	{
		this._log("warning", msg, err);
	},

	"error": function(msg, err)
	{
		this._log("error", msg, err);
	},

	"_log": function(type, msg, err)
	{
		//do nothing if there's no error
		if (!err)
			return false;

		//write to console regardless of configuration
		console.log(msg+" ("+err+")");

		//don't proceed if this log type shouldn't be logged
		if (this.log.indexOf(type) !== -1)
			return false;

		//create time strings
		var date = new Date();

		var month = makeTwoDigits(date.getMonth());
		var day = makeTwoDigits(date.getDay());
		var hour = makeTwoDigits(date.getHours());
		var minute = makeTwoDigits(date.getMinutes());

		//prepare message string
		var msg = hour+":"+minute+" "+msg+" ("+err+")";

		//prepare file name
		var fileName = month+"."+day+".log";

		//finally write to file
		fs.appendFile(path.join(this.dir, fileName), function(err)
		{
			if (err)
				throw new Error("Could not write to log dir! "+err);

			if (type === "error")
				process.exit();
		});
	}
}

//turn single digit numeric strings into two digits
function makeTwoDigits(num)
{
	num = ""+num;

	if (num.length === 1)
		num = "0"+num;
	
	return num;
}
