<?php
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->id)) fail();

$id = $mysqli->real_escape_string($args->id);

$entriesInPage = $mysqli->query("SELECT id FROM entries WHERE page_id=$id")->fetch_assoc();
$hasChildPages = $mysqli->query("SELECT id FROM pages WHERE parent_page_id=$id")->fetch_assoc();

if ($entriesInPage)
	fail("EENTRIESINPAGE");
if ($hasChildPages)
	fail("EHASCHILDPAGES");

$mysqli->query("DELETE FROM pages WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
