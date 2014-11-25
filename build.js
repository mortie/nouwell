#!/usr/bin/env node

var startTime = new Date();

var fs = require("fs");
var path = require("path");
var Logger = require("./js/logger");
var Database = require("./js/database");
var Builder = require("./js/builder");
var Template = require("./js/template");

var conf;
var logger;
var db;
var builder;
var template;

//create logger instance
logger = new Logger(
{
	"log": false,
	"dir": null
});

//parse and read conf file
try
{
	conf = JSON.parse(fs.readFileSync("conf.json"));
}
catch (err)
{
	logger.error("Couldn't parse config file.", err);
}

//set logger's settings appropriately according to conf file
logger.log = conf.log;
logger.dir = conf.dir.log;

var db = new Database(conf.dir.db);

db.setup(function()
{
	templateDir = path.join(conf.dir.theme, conf.theme, "html");

	template = new Template(
	{
		"suffix": ".html",
		"path": templateDir
	});

	//create new site builder instance
	builder = new Builder(
	{
		"dir":
		{
			"out": conf.dir.out,
			"admin": conf.dir.admin,
			"theme": path.join(conf.dir.theme, conf.theme),
			"plugin": conf.dir.plugin
		},
		"db": db,
		"logger": logger,
		"template": template,
		"title": conf.title,
		"headerImage": conf.headerImage,
		"favicon": conf.favicon
	});

	//actually build site
	builder.build(function()
	{
		var endTime = new Date();

		var elapsed = endTime.getTime() - startTime.getTime();

		logger.info("Done in "+elapsed+" milliseconds.", function()
		{
			process.exit();
		});
	});
});
