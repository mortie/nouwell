router.addPanel("home", function()
{
	lib.template.load(["home"], function()
	{
		lib.template("home");
	});
});
