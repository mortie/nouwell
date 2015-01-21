module.exports = function prepareTree(cb)
{
	var self = this;

	self.logger.debug("Preparing tree");

	var callbacks = 2;

	var pages;
	var posts;

	self.db.getFiles("pages", function gotPages(err, result)
	{
		pages = result;

		--callbacks;
		if (callbacks === 0) build();
	});

	self.db.getFiles("posts", function gotPosts(err, result)
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
		pages.forEach(function prepareParents(page)
		{
			preparePage(page);
			if (!page.parent_page_id)
				tree[page.id] = page;
		});

		//prepare children
		pages.forEach(function prepareChildren(page)
		{
			if (page.parent_page_id)
			{
				tree[page.parent_page_id].children.push(page);
			}
		});

		//sort children
		self.tree = [];
		tree.forEach(function sortChildren(page)
		{
			self.tree.push(tree[page.id]);

			var index = self.tree.length-1;

			if (self.tree[index])
			{
				self.tree[index].children.sort(function(x, y)
				{
					return x.sort > y.sort ? 1 : -1;
				});
			}
		});

		//sort parents
		self.tree.sort(function sortParents(x, y)
		{
			return x.sort > y.sort ? 1 : -1;
		});

		//we're done preparing the tree!
		cb();
	}

	function preparePage(page)
	{
		page.children = [];
		page.posts = [];

		posts.forEach(function loopPosts(post)
		{
			if (post.page_id == page.id)
				page.posts.push(post);
		});
	}
}
