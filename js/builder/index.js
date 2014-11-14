var fs = require("fs");
var path = require("path");

module.exports = function(conf)
{
	this.outDir = conf.dir.out;
	this.themeDir = conf.dir.theme;
	this.adminDir = conf.dir.admin;
	this.pluginDir = conf.dir.plugin;
	this.db = conf.db;
	this.logger = conf.logger;
	this.template = conf.template;
	this.title = conf.title;
	this.headerImage = conf.headerImage;
	this.favicon = conf.favicon;

	this.cbs = 0;
}

module.exports.prototype =
{
	"build": function(cb)
	{
		var self = this;

		this._series(
		[
			require("./prepareDirs.js"),
			require("./preparePlugins"),
			require("./prepareDatabase.js"),
			require("./prepareMedia.js"),
			require("./prepareTheme.js"),
			require("./prepareTree.js"),
			require("./writeFiles.js")
		],
		function()
		{
			//end, and eventually call back to caller
			self._end(cb);
		});
	},

	"_end": function(cb)
	{
		var self = this;

		//wait for everything to complete before running callback
		var interval = setInterval(function()
		{
			if (self.cbs < 1)
			{
				cb();
				clearInterval(interval);
			}
		}, 1);
	},

	"_series": function series(funcs, cb)
	{
		if (funcs[1] === undefined)
		{
			funcs[0].call(this, cb);
		}
		else
		{
			funcs[0].call(this, function()
			{
				funcs.splice(0, 1);
				series.call(this, funcs, cb);
			}.bind(this));
		}
	},
}

