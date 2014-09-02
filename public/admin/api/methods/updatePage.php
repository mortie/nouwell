<?php
if (!$calledCorrectly) die();
requireToken();

$title = $mysqli->real_escape_string($args->title);
$id = $mysqli->real_escape_string($args->id);

if (!$title || !$id) fail();

$mysqli->query("UPDATE categories SET title='$title' WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
