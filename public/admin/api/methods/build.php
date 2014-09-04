<?php
if (!$calledCorrectly) die();
requireToken();

chdir($root);
$output = shell_exec("node siteBuild.js");

succeed(
[
	"output"=>$output
]);
