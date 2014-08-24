router.addPage("home", function()
{
	lib.template.load(["home"], function()
	{
		lib.template("home");
	});
});
