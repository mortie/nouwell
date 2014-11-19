<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->title)) fail();
if (!isset($args->id)) fail();

$title = $mysqli->real_escape_string($args->title);
$id = $mysqli->real_escape_string($args->id);

$mysqli->query("UPDATE media SET title='$title' WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
