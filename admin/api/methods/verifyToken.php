<?php
if (!$calledCorrectly) die();

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
