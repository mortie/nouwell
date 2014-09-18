module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	self.db.query("getPages", function(err, result)
	{
		self.logger.error("Couldn't get pages!", err);

		if (!result.length)
		{
			self.logger.info("No pages, adding default page 'Home'");
			self.db.query("addPage",
			{
				"title": "Home",
				"slug": "home"
			}, function() {});
		}

		--self.cbs;
	});

	cb();
}
