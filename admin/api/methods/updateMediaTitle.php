<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->id)) fail();

$db->updateFile("media", $args->id,
[
	"title"=>$args->title
]);

succeed();
