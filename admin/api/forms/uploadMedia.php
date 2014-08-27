<?php
if (!$calledCorrectly) die();
requireToken();

$file = $_FILES['file'];

$fileNameParts = pathinfo($file['name']);
$tmpName = $file['tmp_name'];
$size = $file['size'];

$type = $mysqli->real_escape_string($file['type']);
$title = $mysqli->real_escape_string($fileNameParts['filename']);
$extension = $mysqli->real_escape_string($fileNameParts['extension']);

$rawContent = file_get_contents($tmpName);
$contente = $mysqli->real_escape_string($rawContent);

$mysqli->query("INSERT INTO media (title, type, content, extension) ".
               "VALUES ('$title', '$type', '$content', '$extension')");

$id = $mysqli->insert_id;
$publicDir = $conf->dir->out;

file_put_contents("$root/$publicDir/media/$id.$extension", $rawContent);

succeed(
[
	"title"=>$title,
	"type"=>$type,
	"extension"=>$extension,
]);
