(function()
{
	var token = lib.apiToken || lib.getCookie("token");
	var path = location.hash.substring(1);
	var page = path.split("/")[0];

	if (!token)
	{
		router.enable();
		router.path = "login";
		router.load();
		router.disable();
	}
	else
	{
		lib.callAPI("verifyToken",
		{
			"token": token
		},
		function(result)
		{
			if (result.valid)
			{
				lib.apiToken = token;
				router.enable();
				if (path)
				{
					router.path = path;
					router.load();
				}
				else
				{
					router.path = "home";
				}
			}
			else
			{
				router.enable();
				router.path = "login";
				router.disable();
			}
		});
	}
})();
