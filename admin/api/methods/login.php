<?php
if (!$calledCorrectly) die();

//wrong password
if (empty($conf->adminPassword) || $conf->adminPassword !== $args->password)
{
	fail();
}

//correct password
else
{
	$token = randomString(64);

	$f = fopen("$root/adminTokens", 'a');
	fwrite($f, $token."\n");
	fclose($f);

	succeed(
	[
		"token"=>$token
	]);
}

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
