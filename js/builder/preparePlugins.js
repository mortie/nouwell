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
			if (err.code && err.code !== "EEXIST")
				self.logger.error("Couldn't create plugin dir.", err);

			if (!files)
			{
				self.logger.notice("Plugin dir "+path.join(pluginDir, "php")+" doesn't exist.");
				--self.cbs;
				return;
			}

			files.forEach(function(file)
			{
				writePluginFile(path.join(pluginDir, "conf.json"),
				                path.join(pluginDir, "php", file),
				                path.join(pluginDirOut, file),
				                self);
			});

			--self.cbs;
		});
	});
}

function writePluginFile(confFile, inFile, outFile, self)
{
	++self.cbs;

	var confContent;
	var inContent;

	fs.readFile(confFile, "utf8", function(err, content)
	{
		if (err && err.code == "ENOENT")
			self.logger.notice("No plugin config file "+confFile+".");
		else
			self.logger.error("Could not read config file "+confFile+".", err);

		confContent = content || "";
		if (inContent !== undefined) write();
	});

	fs.readFile(inFile, "utf8", function(err, content)
	{
		self.logger.error("Could not read plugin file "+inFile+".", err);

		inContent = content;
		if (confContent !== undefined) write();
	});

	function write()
	{
		//escape json
		var confEscaped = confContent.replace(/\"/g, '\\"')
		                             .replace(/\'/g, "\\'")

		var prefix = "<?php $conf = json_decode(\"\n"+confEscaped+"\"); ?>\n";
		var content = prefix+inContent;

		fs.writeFile(outFile, content, function(err)
		{
			self.logger.error("Could not write plugin file "+outFile+".", err);
			--self.cbs;
		});
	}
}
