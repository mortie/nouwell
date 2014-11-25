<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$db->deleteFile("media", $args->id);

succeed();
