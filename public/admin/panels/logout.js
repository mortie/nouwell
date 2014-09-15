router.addPanel("logout", function()
{
	lib.callAPI("logout", {}, function(result)
	{
		lib.setCookie("token", "");
		lib.apiToken = "";
		router.path = "login";
		nav.load();
		router.disable();
	});
});
