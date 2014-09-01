<?php
if (!$calledCorrectly) die();
requireToken();

$media = $mysqli->query("SELECT id, title, extension, type ".
                        "FROM media");

if ($mysqli->error) fail($mysqli->error);

$result = [];

while ($entry = $media->fetch_assoc())
{
	array_push($result, $entry);
}

succeed(
[
	"media"=>$result
]);
