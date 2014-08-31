<?php
if (!$calledCorrectly) die();
requireToken();

$name = $mysqli->real_escape_string($args->name);
$id = $mysqli->real_escape_string($args->id);

if (!$name || !$id) fail();

$mysqli->query("UPDATE categories SET name='$name' WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
