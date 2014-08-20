#!/usr/bin/env node

var fs = require("fs");
var Logger = require("logger");
var Database = require("database");
var SiteBuilder = require("siteBuilder");

var conf;
var logger;
var db;
var builder;

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

db.query("setup",
{
	"db": conf.sql.database
},
function(err)
{
	//create new site builder instance
	try
	{
		builder = new SiteBuilder(conf.dir.out, db, logger);
	}
	catch (err)
	{
		logger.error("Couldn't create SiteBuilder instance.", err);
	}

	builder.build(function()
	{
		console.log("done");
	});
});
