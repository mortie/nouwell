<?PHP
if (!$calledCorrectly) die();
requireToken();

$pluginDir = $conf->dir->plugin;
$plugins = scandir("$root/$pluginDir");

$filtered = [];
foreach ($plugins as $plugin)
{
	if ($plugin[0] !== ".")
		array_push($filtered, $plugin);
}

succeed(
[
	"plugins"=>$filtered
]);
