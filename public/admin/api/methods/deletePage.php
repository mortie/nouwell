<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$db->deleteFile("pages", $args->id);

succeed();
