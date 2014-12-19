<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();
if (!isset($args->html)) fail();
if (!isset($args->raw)) fail();
if (!isset($args->date_seconds)) fail();
if (!isset($args->page_id)) fail();

$id = $db->pushFile("posts",
[
	"title"=>$args->title,
	"slug"=>$args->slug,
	"html"=>$args->html,
	"raw"=>$args->raw,
	"date_seconds"=>$args->date_seconds,
	"page_id"=>$args->page_id,
	"sort"=>$db->getNextIndex("posts")
]);

if (!$id)
	fail();

succeed(
[
	"id"=>$id
]);
