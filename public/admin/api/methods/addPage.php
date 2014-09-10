<?php
if (!$calledCorrectly) die();
requireToken();

$title = $mysqli->real_escape_string($args->title);
$slug = $mysqli->real_escape_string($args->slug);
$parent = $mysqli->real_escape_string($args->parent_page_id);

$mysqli->query("INSERT INTO pages (title, slug, parent_page_id) VALUES ('$title', '$slug', '$parent')");

if ($mysqli->error)
{
	fail($mysqli->error);
}
else
{
	succeed();
}
