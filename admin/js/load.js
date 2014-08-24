(function()
{
	window.router = new Router(document.getElementById("page"));
   
	router.on("load", function(first)
	{
		var token = lib.apiToken || lib.getCookie("token");
		var path = location.hash.substring(1);
		var page = path.split("/")[0];

		//go to a page which doen't require auth if not authenticated.
		//otherwise, go to home.
		if (first)
		{
			if (token)
			{
				lib.callAPI("verifyToken",
				{
					"token": token
				},
				function(result)
				{
					if (result.valid)
						router.path = path || "home";
					else
						router.path = "login";
				});
			}
			else
			{
				router.path = "login";
			}
		}
		else
		{
			if (!token && page !== "login")
				router.path = "login";
		}
	});
})();
