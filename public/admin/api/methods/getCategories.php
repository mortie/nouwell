<?php
if (!$calledCorrectly) die();
verifyToken();

$categories = $mysqli->query("SELECT id, name ".
                             "FROM categories");

if (!$categories) fail(
[
	"error"=>$mysqli->error
]);

$result = [];

while ($category = $categories->fetch_assoc())
{
	array_push($result, $category);
}

succeed(
[
	"categories"=>$result
]);
