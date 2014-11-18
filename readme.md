# siteBuilder

## About
siteBuilder is a free (both as in beer and as in speech) content management system. It features a user friendly admin interface, as well as a powerful plugin system and theme support. As opposed to the majority of content management systems out there, siteBuilder doesn't regenerate the page at every request; instead, it generates the entire directory structure of the website, with plain .html files, after you've made changes in the admin interface.

## Installation

### On a private server or computer
siteBuilder has the following dependencies:

	* PHP 5 (including the MySQL and JSON modules)
	* Node.js
	* Some web server
	* MySQL

1. Clone this repository into a directory (henceforth referred to as `{installDir}`) that is **not accessible** from the web server:

```
cd {installDir}
git clone https://github.com/mortie/siteBuilder
```

2. Edit the configuration file (`{installDir}/conf.json`}, and set the values in `sql` and the `adminPassword` appropriately.

3. Set your web server's web root to `{installDir}/public/`. I suggest using [Apache VirtualHost](https://httpd.apache.org/docs/2.2/vhosts/index.html) or similar if you want to host more websites than one siteBuilder instance on the same physical server. Just make sure `{installDir}/public/` is a web root, and that `{installDir}` is **not** accessible from the outside.

4. Go to `{your website or IP}/admin/` in your browser, and log in with the password you set in step 2. Go to the `Build` tab, and press `Build`. With some luck, it will tell you that it generates a new page called `Home`, and then finish without errors.

### On a limited web host
Because siteBuilder generates a directory structure with static HTML files, it can be made to work with even the most limited of web hosts.

1. Set up siteBuilder on a computer (be it your personal one or a VPS or physical server you have access to) according to [the "On a private server" instructions](#on-a-private-server-or-computer).

2. Make the desired changes.

3. Copy `{installDir}/public/` to your web host's web root.

Repeat step 3 every time you make any changes. It may be a good idea to make a script to automate that.

Please note that your web support will likely need to support PHP (with the JSON module) in order to support plugins. Even if your web host supports PHP, you may encounter some plugins which don't work.

## Legal
All the files in this repository, with a few exceptions, are copyrighted by me, Martin Dørum Nygaard, and licensed under the GNG GPL V2.

The exceptions are:

	* Everything in the directory node_modules/
	* Everything in the directory admin/lib/ (and public/admin/lib/)
