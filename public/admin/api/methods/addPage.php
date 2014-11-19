<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();

$title = $mysqli->real_escape_string($args->title);
$slug = $mysqli->real_escape_string($args->slug);
$parent = $mysqli->real_escape_string($args->parent_page_id);

if ($parent)
	$mysqli->query("INSERT INTO pages (title, slug, parent_page_id) VALUES ('$title', '$slug', '$parent')");
else
	$mysqli->query("INSERT INTO pages (title, slug) VALUES ('$title','$slug')");

if ($mysqli->error)
{
	fail($mysqli->error);
}
else
{
	succeed();
}
