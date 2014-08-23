<?php

//get arguments
$args = json_decode($_POST['args']);

//get requested page
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
$mysqli = new Mysqli(
	conf.sql.host,
	conf.sql.username,
	conf.sql.password,
	conf.sql.database,
	conf.sql.port
);

//reply to caller
function reply($arr)
{
	echo json_encode($arr);
}

//include correct method
include "methods/$method.php";
