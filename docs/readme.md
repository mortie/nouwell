# Documentation
This is documentation for making plugins and themes for siteBuilder. This document contains information relevant for both themes and plugins. For more in-depth information about making themes, [go to themes.md](https://github.com/mortie/nouwell/docs/themes.md). For more in-depth information about making plugins, [go to plugins.md](https://github.com/mortie/nouwell/docs/plugins.md).

## Overview
There are three main parts to Nouwell: the admin panel, the build script, and the MySQL database. The admin panel's job is to let the user modify the contents of the database. The build script reads from the database, and produces static HTML files in a directory structure. In addition, the build script deals with plugins and themes and such. It could be an idea to open the `public` dir in an existing siteBuilder install to get a rough overview of how it works.

## q.js
q.js is a handy little library for the creators of plugins and themes. Its documentation is in [qjs.md](https://github.com/mortie/nouwell/docs/qjs.md).
