<?php
if (!$calledCorrectly) die();
requireToken();

function mergeArrays($old, $new)
{
	foreach($old as $key=>$val)
	{
		if (is_array($val))
		{
			$new[$key] = mergeArrays($old[$key], $new[$key]);
		}
		else
		{
			$new[$key] = $val;
		}
	}
	return $new;
}

chdir($root);

exec("git reset --hard; git pull", $output);

$newConf = json_decode(file_get_contents("conf.json"), true);

$mergedConf = mergeArrays(json_decode(json_encode($conf), true), $newConf);

file_put_contents("conf.json", json_encode($mergedConf, JSON_PRETTY_PRINT));

succeed(
[
	"output"=>$output
]);
