router.addPanel("build", function()
{
	var async = new lib.Async(2, draw);

	lib.template.load(["build"], async);

	setTimeout(async, 50);

	function draw()
	{
		router.ready();
		lib.template("build");

		gui.on("#build", "click", function(element)
		{
			var responseElement = document.getElementById("response");
			responseElement.innerHTML = "";

			lib.callAPI("build", {}, function(response)
			{
				responseElement.innerHTML = response.output;
			});
		});
	}
});
