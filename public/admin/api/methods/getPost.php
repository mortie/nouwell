<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$post = $db->getFile("posts", $args->id);

succeed(
[
	"post"=>$post
]);
