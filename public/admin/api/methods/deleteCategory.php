<?php
if (!$calledCorrectly) die();
requireToken();

$id = $mysqli->real_escape_string($args->id);

$entriesInCategory = $mysqli->query("SELECT id FROM entries WHERE categories_id=$id")->fetch_assoc();

if ($entriesInCategory)
	fail("Entries in category");

$mysqli->query("DELETE FROM categories WHERE id=$id");

if ($mysqli->error) fail($mysqli->error);

succeed();
