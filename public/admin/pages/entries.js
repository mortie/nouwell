router.addPage("entries", function(args)
{
	if (args[1] === "edit")
	{
		
	}
	else
	{
		var entries;

		var callbacks = 2;

		lib.template.load(["entries"], function()
		{
			--callbacks;
			if (callbacks === 0) draw();
		});

		lib.callAPI("getEntries",
		{
			"id": args[1]
		},
		function(result)
		{
			entries = result;

			--callbacks;
			if (callbacks === 0) draw();
		});

		function draw()
		{
			console.log(entries);
		}
	}
});
