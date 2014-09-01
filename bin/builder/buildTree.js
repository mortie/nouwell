module.exports = function(cb)
{
	var self = this;

	self.db.query("getEntries", function(err, result)
	{
		var tree = [];
		var i;
		for (i in result)
		{
			var entry = result[i];

			if (!tree[entry.categories_id])
				tree[entry.categories_id] = [];

			tree[entry.categories_id][entry.id] = entry.html;
		}

		self.tree = tree;
		cb();
	});
}
