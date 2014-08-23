(function()
{
	var token = lib.getCookie("token");

	var noAuthPages =
	[
		"login",
		"newUser"
	];

	window.router = new Router(document.getElementById("page"), function(first)
	{
		var path = location.hash.substring(1);
		var page = path.split("/")[0];

		//go to a page which doen't require auth if not authenticated.
		//otherwise, go to home.
		if (first)
		{
			if (token || noAuthPages.indexOf(page) !== -1)
				router.path = path || "home";
			else
				router.path = "login";
		}
		else
		{
			if (noAuthPages.indexOf(page) === -1)
				router.path = "login";
		}
	});
})();
