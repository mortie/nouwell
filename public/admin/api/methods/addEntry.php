<?php
if (!$calledCorrectly) die();
requireToken();

$properties =
[
	"title",
	"html",
	"raw",
	"slug",
	"date_seconds",
	"sort",
	"pages_id",
];

$keys = "";
foreach ($properties as $property)
{
	if (!empty($args->$property))
		$keys .= "$property, ";
}
$keys = substr($keys, 0, -2);

$vals = "";
foreach ($properties as $property)
{
	if (!empty($args->$property))
	{
		$content = $mysqli->real_escape_string($args->$property);
		$vals .= "'$content', ";
	}
}
$vals = substr($vals, 0, -2);

$query = "INSERT INTO entries ($keys) VALUES ($vals)";

$mysqli->query($query);

if ($mysqli->error) fail($mysqli->error." $query");

succeed(
[
	"id"=>$mysqli->insert_id
]);
