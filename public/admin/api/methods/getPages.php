<?php
if (!$calledCorrectly) die();
requireToken();

$pages = $db->getFiles("pages");

succeed(
[
	"pages"=>$pages
]);
