module.exports = function(cb)
{
	var self = this;

	var callbacks = 2;

	var categories;
	var entries;

	self.db.query("getCategories", function(err, result)
	{
		self.logger.error("Could not fetch categories.", err);
		categories = result;

		--callbacks;
		if (callbacks === 0) build();
	});

	self.db.query("getEntries", function(err, result)
	{
		self.logger.error("Could not fetch entries.", err);
		entries = result;

		--callbacks;
		if (callbacks === 0) build();
	});

	function build()
	{
		self.tree = [];

		categories.forEach(function(category, i)
		{
			category.entries = [];
			self.tree[category.id] = category;
		});

		entries.forEach(function(entry)
		{
			if (self.tree[entry.categories_id])
				self.tree[entry.categories_id].entries.push(entry);
		});

		cb();
	}
}
