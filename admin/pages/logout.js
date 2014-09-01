router.addPage("logout", function()
{
	lib.callAPI("logout", {}, function(result)
	{
		lib.setCookie("token", "");
		lib.apiToken = "";
		router.path = "login";
		router.load();
		router.disable();
	});
});
