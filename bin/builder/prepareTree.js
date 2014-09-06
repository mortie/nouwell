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
		var tree = [];

		//prepare parents
		pages.forEach(function(page)
		{
			if (!page.parent_page_id)
			{
				preparePage(page);
				tree[page.id] = page;
			}
		});

		//prepare children
		pages.forEach(function(page)
		{
			if (page.parent_page_id)
			{
				preparePage(page);
				tree[page.parent_page_id].push(page);
			}
		});

		//sort
		self.tree = [];
		tree.forEach(function(page)
		{
			self.tree = tree[page.id];
		});

		//we're done preparing the tree!
		cb();
	}

	function preparePage(page)
	{
		page.childs = [];
		page.entries = [];

		entries.forEach(function(entry)
		{
			if (entry.page_id === page.id)
				page.entries.push(entry);
		});
	}
}
