<?php
if (!$calledCorrectly) die();
requireToken();

$pages = $db->getFiles("pages");

usort($pages, function($x, $y)
{
	return $x->sort - $y->sort;
});

succeed(
[
	"pages"=>$pages
]);
