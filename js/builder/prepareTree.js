module.exports = function(cb)
{
	var self = this;

	var callbacks = 2;

	var pages;
	var posts;

	self.db.getFiles("pages", function(err, result)
	{
		pages = result;

		--callbacks;
		if (callbacks === 0) build();
	});

	self.db.getFiles("posts", function(err, result)
	{
		posts = result.reverse();
		posts.sort(function(x, y)
		{
			return x.sort > y.sort ? -1 : 1;
		});

		--callbacks;
		if (callbacks === 0) build();
	});

	function build()
	{
		var tree = [];

		//prepare parents
		pages.forEach(function(page)
		{
			preparePage(page);
			if (!page.parent_page_id)
				tree[page.id] = page;
		});

		//prepare children
		pages.forEach(function(page)
		{
			if (page.parent_page_id)
			{
				tree[page.parent_page_id].children.push(page);
			}
		});

		//sort
		self.tree = [];
		tree.forEach(function(page)
		{
			self.tree.push(tree[page.sort]);
			self.tree[self.tree.length-1].children.sort(function(x, y)
			{
				return x.sort > y.sort ? 1 : -1;
			});
		});

		//we're done preparing the tree!
		cb();
	}

	function preparePage(page)
	{
		page.children = [];
		page.posts = [];

		posts.forEach(function(post)
		{
			if (post.page_id == page.id)
				page.posts.push(post);
		});
	}
}
