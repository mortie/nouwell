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

	gui.on("#menu-button", "click", function(element)
	{
		var navElement = document.getElementById("nav");
	
		if (navElement.className == "active")
			navElement.className = "";
		else
			navElement.className = "active";
	});

	router.on("load", function()
	{
		document.getElementById("nav").className = "";
	});
})();
