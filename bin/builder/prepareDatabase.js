module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	self.db.query("getCategories", function(err, result)
	{
		if (!result.length)
		{
			self.logger.info("No categories, adding default 'Page' category");
			self.db.query("addCategory",
			{
				"name": "Page"
			}, function() {});
		}

		--self.cbs;
	});

	cb();
}
