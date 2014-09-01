<?php
if (!$calledCorrectly) die();
requireToken();

$categories = $mysqli->query("SELECT id, name ".
                             "FROM categories");

if (!$categories) fail($mysqli->error);

$result = [];

while ($category = $categories->fetch_assoc())
{
	array_push($result, $category);
}

succeed(
[
	"categories"=>$result
]);
