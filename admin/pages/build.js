router.addPage("build", function()
{
	lib.template.load(["build"], function()
	{
		draw();
	});

	function draw()
	{
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
