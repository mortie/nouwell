module.exports = function(cb)
{
	var self = this;

	var callbacks = 2;

	var pages;
	var entries;

	self.db.query("getPages", function(err, result)
	{
		self.logger.error("Could not fetch pages.", err);
		pages = result;

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

		pages.forEach(function(page, i)
		{
			page.entries = [];

			entries.forEach(function(entry)
			{
				if (entry.pages_id === page.id)
					page.entries.push(entry);
			});

			self.tree[i] = page;
		});

		cb();
	}
}
