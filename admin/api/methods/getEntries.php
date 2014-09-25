<?php
if (!$calledCorrectly) die();
requireToken();

$page_id = $mysqli->real_escape_string($args->page_id);
$entries = $mysqli->query("SELECT id, title, sort ".
                          "FROM entries ".
                          "WHERE page_id = $page_id");

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
