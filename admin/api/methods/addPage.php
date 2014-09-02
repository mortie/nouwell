<?php
if (!$calledCorrectly) die();
requireToken();

$title = $mysqli->real_escape_string($args->title);
$slug = $mysqli->real_escape_string($args->slug);

$mysqli->query("INSERT INTO pages (title, slug) VALUES ('$title', '$slug')");

if ($mysqli->error)
{
	fail($mysqli->error);
}
else
{
	succeed();
}
