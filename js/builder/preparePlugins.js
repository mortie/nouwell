var fs = require("fs");
var path = require("path");

module.exports = function(cb)
{
	var self = this;

	++self.cbs;
	fs.readdir(self.pluginDir, function(err, plugins)
	{
		if (err)
		{
			self.logger.notice("Couldn't read pugin directory.");
			--self.cbs;
			return;
		}

		plugins.forEach(function(plugin)
		{
			preparePlugin(plugin, self);
		});

		--self.cbs;
	});

	cb();
}

function preparePlugin(plugin, self, cb)
{
	var pluginDirOut = path.join(self.outDir, "_plugins", plugin);
	var pluginDir = path.join(self.pluginDir, plugin);

	++self.cbs;
	fs.readdir(path.join(pluginDir, "php"), function(err, files)
	{
		fs.mkdir(pluginDirOut, function(err)
		{
			if (err.code !== "EEXIST")
				self.logger.error("Couldn't create plugin dir.", err);

			files.forEach(function(file)
			{
				var newFile = fs.createWriteStream(path.join(pluginDirOut, file));
				var oldFile = fs.createReadStream(path.join(pluginDir, "php", file));

				++self.cbs;
				oldFile.pipe(newFile);
				oldFile.on("end", function()
				{
					--self.cbs;
				});
			});

			--self.cbs;
		});
	});
	console.log(plugin);
}
