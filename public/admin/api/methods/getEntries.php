<?php
if (!$calledCorrectly) die();
requireToken();

$category = $mysqli->real_escape_string($args->category);
$entries = $mysqli->query("SELECT id, title, sort ".
                          "FROM entries ".
                          "WHERE categories_id = $category");

if (!$entries) fail(
[
	"error"=>$mysqli->error
]);

$results = [];

while ($entry = $entries->fetch_assoc())
{
	array_push($results, $entry);
}

succeed(
[
	"entries"=>$results
]);
