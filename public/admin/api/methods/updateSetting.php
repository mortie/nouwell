<?php
if (!$calledCorrectly) die();
requireToken();

$key = $args->key;
$val = $args->val;

$conf->${key} = $val;

file_put_contents("$root/conf.json", json_encode($conf, JSON_PRETTY_PRINT));

succeed(
[
	"conf"=>$conf
]);
