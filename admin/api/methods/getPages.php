<?php
if (!$calledCorrectly) die();
requireToken();

$pages = $mysqli->query("SELECT id, title, slug, parent_page_id ".
                             "FROM pages");

if ($mysqli->error) fail($mysqli->error);

$result = [];

while ($page = $pages->fetch_assoc())
{
	if (!$page['parent_page_id'])
		$page['parent_page_id'] = false;

	array_push($result, $page);
}

succeed(
[
	"pages"=>$result
]);
