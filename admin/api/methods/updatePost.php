<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();
if (!isset($args->html)) fail();
if (!isset($args->raw)) fail();

$id = $db->updateFile("posts", $args->id,
[
	"title"=>$args->title,
	"slug"=>$args->slug,
	"html"=>$args->html,
	"raw"=>$args->raw,
]);

succeed(
[
	"id"=>$id
]);
