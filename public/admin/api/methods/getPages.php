<?php
if (!$calledCorrectly) die();
requireToken();

$pages = $mysqli->query("SELECT id, title, slug ".
                             "FROM pages");

if ($mysqli->error) fail($mysqli->error);

$result = [];

while ($page = $pages->fetch_assoc())
{
	array_push($result, $page);
}

succeed(
[
	"pages"=>$result
]);
