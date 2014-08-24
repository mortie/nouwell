<?php

//get arguments
$args = json_decode(file_get_contents("php://input"));

//get requested page, or die trying
if (empty($args->m))
	die("no method provided");
$method = $args->m;

//die if no method requested
if (empty($method)) die();

//let method files make sure they're called via this script and not directly
$calledCorrectly = true;

//path to root directory
$root = "../../..";

//configuration file
$conf = json_decode(file_get_contents("$root/conf.json"));

//mysql connection
$mysqli = new mysqli(
	$conf->sql->host,
	$conf->sql->username,
	$conf->sql->password,
	$conf->sql->database,
	$conf->sql->port
);

//check whether token is valid
function verifyToken($token)
{
	global $root;
	$path = "$root/adminTokens";

	if (!file_exists($path))
		return false;

	$validTokens = explode("\n", file_get_contents($path));

	return in_array($token, $validTokens);
}

//reply to caller if success
function succeed($arr=[])
{
	$arr['success'] = true;
	die(json_encode($arr));
}

//reply to caller if failure
function fail($arr=[])
{
	$arr['success'] = false;
	die(json_encode($arr));
}

function requireToken()
{
	global $args;

	if (!empty($args->token) && verifyToken($args->token))
	{
		return true;
	}
	else
	{
		fail(
		[
			"error"=>"Invalid token"
		]);
	}
}

//include correct method
include "methods/$method.php";
