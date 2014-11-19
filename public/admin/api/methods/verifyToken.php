<?php
if (!$calledCorrectly) die();

if (!isset($args->token)) fail();

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
