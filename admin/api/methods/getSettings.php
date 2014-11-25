<?php
if (!$calledCorrectly) die();
requireToken();

succeed(
[
	"settings"=>
	[
		"title"=>$conf->title,
		"theme"=>$conf->theme,
		"favicon"=>$conf->favicon,
		"headerImage"=>$conf->headerImage
	]
]);
