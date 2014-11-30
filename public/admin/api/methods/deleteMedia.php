<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$db->deleteBlob("media", $args->id);

succeed();
