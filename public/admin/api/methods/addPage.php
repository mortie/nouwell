<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();

$id = $db->pushFile("pages",
[
	"title"=>$args->title,
	"slug"=>$args->slug,
	"parent_page_id"=>$args->parent_page_id,
	"sort"=>null
]);

succeed();
