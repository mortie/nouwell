$(".readMore").on("click", function(element)
{
	var article = element.parentNode;
	var baseClass = article.className;

	article.className = baseClass+" expand";
});

var posts = $(".entry .content");

posts.forEach(function(element)
{
	if (element.offsetHeight < 300 || posts.length <= 1)
		element.parentNode.className += " expanded";
});
