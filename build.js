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

//parse and read conf file
try
{
	conf = JSON.parse(fs.readFileSync("conf.json"));
}
catch (err)
{
	console.log("Couldn't parse config file.", err);
	process.exit();
}

//create logger instance
logger = new Logger(
{
	"log": conf.log,
	"dir": conf.dir.log
});

//create database instance
try
{
	var db = new Database(conf.dir.db);
}
catch (e)
{
	logger.error("Couldn't parse database schema file.", e);
}

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
