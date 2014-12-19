q(".readMore").on("click", function(e, element)
{
	console.log(element);
	var article = element.get("parentNode");
	var content = article.querySelector(".content");
	var baseClass = article.className;

	article.className = baseClass+" expand";
	setTimeout(function()
	{
		content.style.maxHeight = "none";
	}, 2000);
});

var posts = q(".entry .content");

posts.forEach(function(element)
{
	if (element.get("offsetHeight") < 300 || posts.length <= 1)
	{
		element.get("parentNode").className += " expanded";

		//hack for safari
		element.get("style").minHeight = element.get("offsetHeight")+"px";
	}
});
