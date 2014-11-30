<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->page_id)) fail();

$posts = $db->getFiles("posts");

$result = [];

foreach($posts as $post)
{
	if ($post->page_id == $args->page_id)
		array_push($result, $post);
}

usort($result, function($x, $y)
{
	return $y->sort - $x->sort;
});

succeed(
[
	"posts"=>$result
]);
