<?php
if (!$calledCorrectly) die();
verifyToken();

$media = $mysqli->query("SELECT id, title, extension, type ".
                        "FROM media");

if (!$media) fail(
[
	"error"=>$mysqli->error
]);

$result = [];

while ($entry = $media->fetch_assoc())
{
	array_push($result, $entry);
}

succeed(
[
	"media"=>$result
]);
