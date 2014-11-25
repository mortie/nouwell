module.exports = function(title, slug, cb)
{
	var index = 0;
	var page =
	{
		"title": title,
		"slug": slug
	}

	this.pushFile("pages", JSON.stringify(page), cb);
}
