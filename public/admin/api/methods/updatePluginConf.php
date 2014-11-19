<?PHP
if (!$calledCorrectly) die();
requireToken();

if (!isset($args->plugin)) fail();
if (!isset($args->conf)) fail();

$pluginName = preg_replace("/[^A-Za-z0-9_\-]/" , "_", $args->plugin);
$pluginDir = $conf->dir->plugin;
file_put_contents("$root/$pluginDir/$pluginName/conf.json", $args->conf);

succeed();
