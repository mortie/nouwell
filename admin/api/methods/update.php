<?php
if (!$calledCorrectly) die();
requireToken();

chdir($root);

exec("git reset --hard; git pull", $output);

$newConf = json_decode(file_get_contents("conf.json"));

array_merge_recursive($newConf, $conf);

file_put_contents("conf.json", json_encode($newConf, JSON_PRETTY_PRINT));

succeed(
[
	"output"=>$output
]);
