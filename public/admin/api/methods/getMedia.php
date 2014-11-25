<?php
if (!$calledCorrectly) die();
requireToken();

$media = $db->getFiles("media");

succeed(
[
	"media"=>$media
]);
