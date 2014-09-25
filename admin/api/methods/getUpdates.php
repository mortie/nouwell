<?php
if (!$calledCorrectly) die();
requireToken();

chdir($root);

exec("git fetch; git log HEAD..FETCH_HEAD", $gitOutput);

if ($gitOutput)
{
	$updates = [];

	foreach ($gitOutput as $line)
	{
		if (preg_match("/\ {4}PUSH_UPDATE.+/", $line))
		{
			$update = preg_replace("/\ {4}PUSH_UPDATE\s+/", "", $line);
			array_push($updates, json_decode($update));
		}
	}

	succeed(
	[
		"updates"=>$updates
	]);
}
else
{
	succeed(
	[
		"updates"=>false
	]);
}
