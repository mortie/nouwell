module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	self.db.query("getCategories", function(result)
	{
		if (!result)
		{
			self.db.query("addCategory",
			{
				"name": "Page"
			}, function() {});
		}

		--self.cbs;
	});

	cb();
}
