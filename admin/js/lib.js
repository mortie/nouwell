(function()
{
	window.lib = {};

	lib.template = new Template(
	{
		"defaultObject": document.getElementById("page")
	});

	lib.callAPI = function(method, args, cb)
	{
		args.m = method;
		var xhr = new XMLHttpRequest();
		xhr.open("post", "api/");
		xhr.send();
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
