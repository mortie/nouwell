<?php
if (!$calledCorrectly) die();
requireToken();

chdir($root);
$output = shell_exec("node build.js");

succeed(
[
	"output"=>$output
]);
