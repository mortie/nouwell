<?php
if (!$calledCorrectly) die();
requireToken();

if (!$args->post1) fail();
if (!$args->post2) fail();

$post1 = $db->getFile("posts", $args->post1);
$post2 = $db->getFile("posts", $args->post2);

$db->updateFile("posts", $args->post1,
[
	"sort"=>$post2->sort
]);

$db->updateFile("posts", $args->post2,
[
	"sort"=>$post1->sort
]);


succeed();
