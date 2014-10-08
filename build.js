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

//connect to mysql database
try
{
	db = new Database(
	{
		"username": conf.sql.username,
		"password": conf.sql.password,
		"host": conf.sql.host,
		"port": conf.sql.port
	});
}
catch (err)
{
	logger.error("Couldn't connect to database.", err);
}

db.queryNoEscape("setup",
{
	"db": conf.sql.database
},
function(err)
{
	logger.error("Database error.", err);

	templateDir = path.join(conf.dir.theme, conf.theme, "html");

	template = new Template(
	{
		"suffix": ".html",
		"path": templateDir
	});

	//create new site builder instance
	builder = new Builder(
	{
		"outDir": conf.dir.out,
		"adminDir": conf.dir.admin,
		"themeDir": path.join(conf.dir.theme, conf.theme, "css"),
		"jsDir": path.join(conf.dir.theme, conf.theme, "js"),
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
