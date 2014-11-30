<?php
if (!$calledCorrectly) die();
requireToken();

$file = $_FILES['file'];

$fileNameParts = pathinfo($file['name']);
$tmpName = $file['tmp_name'];
$size = $file['size'];

$type = $file['type'];
$title = $fileNameParts['filename'];
$extension = $fileNameParts['extension'];
$content = file_get_contents($tmpName);

$id = $db->pushBlob("media", $content,
[
	"title"=>$title,
	"type"=>$type,
	"extension"=>$extension
]);

$publicDir = $conf->dir->out;
file_put_contents("$root/$publicDir/_media/$id.$extension", $content);

succeed(
[
	"title"=>$title,
	"type"=>$type,
	"extension"=>$extension
]);
