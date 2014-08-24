<?php
if (!$calledCorrectly) die();
requireToken();

$mysqli->query("SELECT name FROM categories");
