<?php
if (!$calledCorrectly) die();
requireToken();

$id = mysqli->real_escape_string($args->id);
$entry = $mysqli->query("SELECT * FROM entries WHERE slug='$slug'")->fetch_assoc()[0];

if ($mysqli->error) fail($mysqli->error);

succeed(
[
"entry"=>$entry
]);
