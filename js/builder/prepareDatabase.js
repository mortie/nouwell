module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	self.db.getFiles("pages", function(err, result)
	{
		self.logger.error("Couldn't get pages!", err);

		if (!result.length)
		{
			self.logger.info("No pages, adding default page 'Home'");
			self.db.pushFile("pages",
			{
				"title": "Home",
				"slug": "home"
			});
		}

		--self.cbs;
	});

	cb();
}
