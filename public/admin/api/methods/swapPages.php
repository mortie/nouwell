<?php
if (!$calledCorrectly) die();
requireToken();

if (!$args->page1) fail();
if (!$args->page2) fail();

$page1 = $db->getFile("pages", $args->page1);
$page2 = $db->getFile("pages", $args->page2);

$db->updateFile("pages", $args->page1,
[
	"sort"=>$page2->sort
]);

$db->updateFile("pages", $args->page2,
[
	"sort"=>$page1->sort
]);


succeed();
