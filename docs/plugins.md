# Plugins
A Nouwell plugin is in the form of a directory which the user installs into their `plugins/` directory. It is divided up into three subdirectories: `js`, `php`, and `css`.

## css
All files in this directory will be combined together into `/style.css`. You should prefix all your CSS classes with the name of your plugin to avoid conflicts; call your classes `pluginName-property`.

## js
All files in this directory will be combined together into `/script.js`. Keep in mind that you have [the q.js library](https://github.com/mortie/nouwell/blob/Stable/docs/qjs.md) to help you out.

## php
All files in this directory will be copied to `/_plugins/pluginName/fileName.php`. It has a couple of predefined variables:

* **$conf**: An object containing the configuration stored in `plugins/pluginName/conf.json`.
