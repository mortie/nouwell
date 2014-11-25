var path = require("path");
var fs = require("fs");

module.exports = function(cb)
{
	var self = this;

	++self.cbs
	self.db.getBlobs("media", function(err, result)
	{
		result.forEach(function(media)
		{
			var fileName = path.join(
				self.outDir,
				"_media",
				media.id+"."+media.extension
			);

			self.logger.info("Writing media file '"+media.title+"'...");

			var writeStream = fs.createWriteStream(fileName);
			media.readStream.pipe(writeStream);

			++self.cbs;
			media.readStream.on("end", function()
			{
				--self.cbs;
			});
		});
		--self.cbs;
	});

	cb();
}
