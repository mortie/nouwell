<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$id = $mysqli->real_escape_string($args->id);
$mysqli->query("DELETE FROM media WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
