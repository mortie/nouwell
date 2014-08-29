module.exports = function(conf)
{
	this.outDir = conf.outDir;
	this.themeDir = conf.themeDir;
	this.templateDir = conf.templateDir;
	this.adminDir = conf.adminDir;
	this.db = conf.db;
	this.logger = conf.logger;
	this.template = conf.template;

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
			require("./prepareDatabase.js"),
			require("./prepareMedia.js"),
			require("./prepareTheme.js"),
			require("./buildTree.js"),
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

