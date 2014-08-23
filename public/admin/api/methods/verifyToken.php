<?php
if (!$calledCorrectly) die();

$tokens = explode("\n", file_get_contents("$root/adminTokens"));

if (verifyToken($args->token))
{
	succeed(
	[
		"valid"=>true
	]);
}
else
{
	succeed(
	[
		"valid"=>false
	]);
}
