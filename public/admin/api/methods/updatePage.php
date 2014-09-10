<?php
if (!$calledCorrectly) die();
requireToken();

$title = $mysqli->real_escape_string($args->title);
$slug = $mysqli->real_escape_string($args->slug);
$id = $mysqli->real_escape_string($args->id);

if (!$title || !$id || !$slug) fail("EPARAMETERSMISSING");

$mysqli->query("UPDATE pages SET title='$title', slug='$slug' WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
