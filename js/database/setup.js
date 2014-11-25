var fs = require("fs");
var path = require("path");

function createIfNotExists(dir, cb)
{
	fs.exists(dir, function(exists)
	{
		if (!exists)
		{
			fs.mkdir(dir, function()
			{
				cb();
			});
		}
		else
		{
			cb();
		}
	});
}

module.exports = function(cb)
{
	var self = this;

	var async = new self.Async(3, cb);

	createIfNotExists(self.dir, function()
	{
		createIfNotExists(path.join(self.dir, "pages"), async);
		createIfNotExists(path.join(self.dir, "posts"), async);
		createIfNotExists(path.join(self.dir, "media"), async);
	});
}
