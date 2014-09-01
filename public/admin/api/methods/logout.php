<?php
if (!$calledCorrectly) die();
requireToken();

$tokens = explode("\n", file_get_contents("$root/adminTokens"));

file_put_contents("$root/adminTokens", "");
$f = fopen("$root/adminTokens", "a");

foreach ($tokens as $token)
{
	if ($token && $token !== $args->token)
		fwrite($f, "$token\n");
}

fclose($f);

succeed();
