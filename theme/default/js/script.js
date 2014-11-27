q(".readMore").on("click", function(element)
{
	var article = element.parentNode;
	var content = $(article, ".content")[0];
	var baseClass = article.className;

	article.className = baseClass+" expand";
	setTimeout(function()
	{
		content.style.maxHeight = "none";
	}, 2000);
});

var posts = $(".entry .content");

posts.forEach(function(element)
{
	if (element.offsetHeight < 300 || posts.length <= 1)
	{
		element.parentNode.className += " expanded";

		//hack for safari
		element.style.minHeight = element.offsetHeight+"px";
	}
});
