<?PHP
if (!$calledCorrectly) die();
requireToken();

if (!$args->plugin) die();
$pluginName = preg_replace("/[^A-Za-z0-9_\-]/" , "_", $args->plugin);

$pluginDir = $conf->dir->plugin;
$settings = file_get_contents("$root/$pluginDir/$pluginName/conf.json");

succeed(
[
	"settings"=>$settings
]);
