<?php
if (!$calledCorrectly) die();
requireToken();

$categories_id = $mysqli->real_escape_string($args->categories_id);
$entries = $mysqli->query("SELECT id, title, sort ".
                          "FROM entries ".
                          "WHERE categories_id = $categories_id");

if ($mysqli->error) fail($mysqli->error);

$results = [];

while ($entry = $entries->fetch_assoc())
{
	array_push($results, $entry);
}

succeed(
[
	"entries"=>$results
]);
