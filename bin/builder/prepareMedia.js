module.exports = function(cb)
{
	var self = this;

	++self.cbs
	self.db.query("getMedia", function(err, result)
	{
		self.logger.error("Couldn't get media!", err);

		result.forEach(function(media)
		{
			var fileName = self.path.join(
				self.outDir,
				"media",
				media.id+"."+media.extension
			);

			self.logger.info("Writing media file '"+media.title+"'...");

			++self.cbs;
			self.fs.writeFile(fileName, media.content, function(err)
			{
				self.logger.error("Coludn't write media file!", err);

				--self.cbs;
			});
		});
		--self.cbs;
	});

	cb();
}
