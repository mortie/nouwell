<?php
if (!$calledCorrectly) die();
requireToken();

$id = $mysqli->real_escape_string($args->id);
$mysqli->query("DELETE FROM media WHERE id=$id");

if ($mysqli->error)
{
	fail($mysqli->error);
}
else
{
	succeed();
}
