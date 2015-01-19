module.exports = function(cb)
{
	var self = this;

	self.logger.debug("Preparing database");

	self.db.getFiles("pages", function(err, result)
	{
		self.logger.error("Couldn't get pages!", err);

		if (!result.length)
		{
			self.logger.info("No pages, adding default page 'Home'");
			self.db.pushFile("pages",
			{
				"title": "Home",
				"slug": "home",
				"sort": self.db.getNextId("pages")
			}, function()
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
