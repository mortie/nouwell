<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->slug)) fail();
if (!isset($args->id)) fail();

$title = $mysqli->real_escape_string($args->title);
$slug = $mysqli->real_escape_string($args->slug);
$id = $mysqli->real_escape_string($args->id);

if (!$title || !$id || !$slug) fail();

$mysqli->query("UPDATE pages SET title='$title', slug='$slug' WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
