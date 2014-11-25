module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	self.db.getPages(function(err, result)
	{
		self.logger.error("Couldn't get pages!", err);

		if (!result.length)
		{
			self.logger.info("No pages, adding default page 'Home'");
			self.db.addPage("Home", "home");
		}

		--self.cbs;
	});

	cb();
}
