(function()
{
	window.lib = {};

	lib.template = new Template(
	{
		"element": document.getElementById("page")
	});

	lib.apiToken = "";

	lib.callAPI = function(method, args, cb)
	{
		if (lib.apiToken)
			args.token = lib.apiToken;
		args.m = method;

		var json = JSON.stringify(args);

		var xhr = new XMLHttpRequest();
		xhr.open("post", "api/");
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json);

		xhr.onload = function()
		{
			console.log(xhr.responseText);
			cb(JSON.parse(xhr.responseText));
		}
	}

	lib.getCookie = function(name)
	{
		if (document.cookie.length === 0)
			return false;

		var cookies = document.cookie.split(";");
		var cookie = cookies.filter(function(cookie)
		{
			return cookie.split("=")[0] === name?true:false
		});

		return cookie[0].split("=")[1];
	}

	lib.setCookie = function(name, val)
	{
		document.cookie = name+"="+val;
	}
})();
