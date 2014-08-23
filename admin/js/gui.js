(function()
{
	var guiContainer = document.getElementById("guiContainer");

	var template = new Template(
	{
		"element": guiContainer
	});

	window.gui = {};

	gui.error = function(message)
	{
		alert(message);
	}
})();
