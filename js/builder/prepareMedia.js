var path = require("path");
var fs = require("fs");

module.exports = function(cb)
{
	var self = this;

	self.logger.debug("Preparing media");

	++self.cbs
	self.db.getBlobs("media", function(err, result)
	{
		result.forEach(function(media)
		{
			var outFile = path.join(
				self.outDir,
				"_media",
				media.id+"."+media.extension
			);

			self.logger.info("Writing media file '"+media.title+"'...");
	
			writeMedia(media, outFile, self);

			//favicon
			if ((media.extension == "ico")
			&&  (media.id+"."+media.extension === self.favicon))
			{
				writeMedia(media, path.join(self.outDir, "favicon.ico"), self);
			}
		});
		--self.cbs;
	});

	cb();
}

function writeMedia(media, outFile, self)
{
	var writeStream = fs.createWriteStream(outFile);
	media.readStream.pipe(writeStream);

	++self.cbs;
	media.readStream.on("end", function()
	{
		--self.cbs;
	});
}
