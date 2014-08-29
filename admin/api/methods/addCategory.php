<?php
if (!$calledCorrectly) die();
requireToken();

$name = $mysqli->real_escape_string($args->name);

$mysqli->query("INSERT INTO categories (name) VALUES ('$name')");

if ($mysqli->error)
{
	fail(
	[
		"error"=>$mysqli->error
	]);
}
else
{
	succeed();
}
