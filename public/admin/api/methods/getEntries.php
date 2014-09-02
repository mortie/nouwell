<?php
if (!$calledCorrectly) die();
requireToken();

$pages_id = $mysqli->real_escape_string($args->pages_id);
$entries = $mysqli->query("SELECT id, title, sort ".
                          "FROM entries ".
                          "WHERE pages_id = $pages_id");

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
