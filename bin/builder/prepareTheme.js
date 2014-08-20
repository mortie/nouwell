var fs = require("fs");

module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	fs.readdir(self.themeDir, function(err, files)
	{
		self.logger.error(err);

		console.log(files);
		--self.cbs;
	});
	cb();
}
