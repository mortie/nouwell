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
	"categories_id",
	"type",
	"list_categories_id"
];

$str = "";
foreach ($properties as $property)
{
	if (!empty($args->$property))
	{
		$content = $mysqli->real_escape_string($args->$property);
		$str .= "$property='$content', ";
	}
}
$str = substr($str, 0, -2);

$id = $mysqli->real_escape_string($args->id);

$query = "UPDATE entries SET $str WHERE id=$id";

$mysqli->query($query);

if ($mysqli->error) fail($mysqli->error." $query");

succeed();
