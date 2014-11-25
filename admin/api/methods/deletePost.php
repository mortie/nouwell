<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$db->deleteFile("posts", $args->id);

succeed();
