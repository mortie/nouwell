(function()
{
	var path = location.hash.substring(1);
	var page = path.split("/")[0];

	if (!lib.apiToken)
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
			"token": lib.apiToken
		},
		function(result)
		{
			if (result.valid)
			{
				router.enable();
				if (path)
				{
					router.path = path;
					router.load();
				}
				else
				{
					router.path = "pages";
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
