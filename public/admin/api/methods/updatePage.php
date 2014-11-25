<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();
if (!isset($args->id)) fail();

$db->rewriteFile("posts", $args->id,
[
	"title"=>$args->title,
	"slug"=>$args->slug
]);

succeed();
