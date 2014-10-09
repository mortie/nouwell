router.addPanel("login", function()
{
	var async = new lib.Async(1, draw);

	lib.template.load(["login"], async);

	function draw()
	{
		lib.template("login");

		var loginButton = document.getElementById("loginButton");
		var passwordField = document.getElementById("passwordField");

		loginButton.addEventListener("click", login);

		passwordField.addEventListener("keypress", function(e)
		{
			//if enter was pressed, log in
			if (e.keyCode === 13)
				login(e);
		});
	}

	function login()
	{
		lib.callAPI("login",
		{
			"password": passwordField.value
		},
		function(result)
		{
			if (result.success)
			{
				lib.apiToken = result.token;
				lib.setCookie("token", result.token);
				router.enable();
				nav.load();
				router.path = "pages";
			}
			else
			{
				gui.error("Wrong password, please try again.");
			}
		});
	}
});
