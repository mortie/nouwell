<?php
if (!$calledCorrectly) die();

if (conf->adminPassword !== args->password)
	die();

$token = randomString(64);

$f = fopen("$root/adminTokens", 'a');
fwrite($f, $token);
fclose($f);

function randomString($length){ 
	$characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	$charsLength = strlen($characters) -1;
	$string = "";
	for($i=0; $i<$length; $i++){
		$randNum = mt_rand(0, $charsLength);
		$string .= $characters[$randNum];
	}
	return $string;
}
