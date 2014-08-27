(function()
{
	var guiContainer = document.getElementById("guiContainer");

	var template = new Template(
	{
		"element": guiContainer
	});

	window.gui = {};

	//TODO: fix this
	gui.error = function(message)
	{
		alert(message);
	}

	//TODO: fix this
	gui.notify = function(message)
	{
		alert(message);
	}
})();
