<?php
if (!$calledCorrectly) die();
requireToken();

succeed(
[
	"settings"=>
	[
		"title"=>$conf->title,
		"theme"=>$conf->theme,
		"adminPassword"=>$conf->adminPassword,
		"favicon"=>$conf->favicon,
		"headerImage"=>$conf->headerImage
	]
]);
