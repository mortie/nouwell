<?php
if (!$calledCorrectly) die();
requireToken();

succeed(
[
	"settings"=>
	[
		"title"=>$conf->title,
		"theme"=>$conf->theme,
		"template"=>$conf->template
	]
]);
