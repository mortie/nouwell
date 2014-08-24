<?php
if (!$calledCorrectly) die();
requireToken();

$slug = mysqli->real_escape_string($args->slug);
$mysqli->query("SELECT * FROM entries WHERE slug='$slug'");
