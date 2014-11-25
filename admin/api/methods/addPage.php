<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();

$db->pushFile("pages",
[
	"title"=>$args->title,
	"slug"=>$args->slug,
	"parent_page_id"=>$args->parent
]);

succeed();
