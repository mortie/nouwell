(function()
{
	var token = lib.getCookie("token");

	window.router = new Router(document.getElementById("page"), function()
	{
		var path = location.hash.substring(1);
		var page = path.split("/")[0];

		if (token || (page === "login" || page === "newUser"))
			router.page = path || "home";
		else
			router.page = "login";
	{
})();
