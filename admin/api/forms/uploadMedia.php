<?php
if (!$calledCorrectly) die();
var_dump($args);
requireToken();

$fileNameParts = pathinfo($_FILES->file->name);
$tmpName = $_FILES->file->file-tmp_name;
$size = $_FILES->file->size;

$type = $mysqli->real_escape_string($_FILES->file->type);
$title = $mysqli->real_escape_string($fileNameParts->basename);
$extension = $mysqli->real_escape_string($fileNameParts->extension);

$f = fopen($tmpName, "r");
$content = $mysqli->real_escape_string(fread($f, $size));
fclose($f);

$mysqli->query("INSERT INTO media (title, type, content, extension)".
               "VALUES ('$title', '$type', '$content', '$extension')");
