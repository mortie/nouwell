<?php
if (!$calledCorrectly) die();
requireToken();

$id = $mysqli->real_escape_string($args->id);
$mysqli->query("DELETE FROM entries WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
