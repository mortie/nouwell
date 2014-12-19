var fs = require("fs");
var path = require("path");

function Async(times, cb)
{
	if (times == 0)
		cb();

	return function()
	{
		--times;
		if (times == 0)
			cb();
	}
}

module.exports = function(dir)
{
	this.dir = dir;
	this.Async = Async;
}

module.exports.prototype =
{
	"setup": require("./setup.js"),

	"pushFile": function(dir, content, cb)
	{
		var self = this;

		fs.readdir(path.join(self.dir, dir), function(err, files)
		{
			if (err)
			{
				cb(err);
				return;
			}

			files = files.sort(function(x, y)
			{
				return parseInt(x) > parseInt(y) ? -1 : 1;
			});

			var index = ((files[0] || 0)+1).toString();

			fs.writeFile(path.join(self.dir, dir, index), JSON.stringify(content), cb);
		});
	},

	"getFiles": function(dir, cb)
	{
		var self = this;

		fs.readdir(path.join(self.dir, dir), function(err, files)
		{
			if (err)
			{
				cb(err);
				return;
			}

			var contents = [];

			var async = new Async(files.length, function()
			{
				contents.sort(function(x, y)
				{
					return x.id > y.id ? 1 : -1;
				});

				cb(undefined, contents || []);
			});

			files.forEach(function(file)
			{
				var fileName = path.join(self.dir, dir, file);

				fs.readFile(fileName, "utf8", function(err, content)
				{
					if (err)
					{
						cb(err);
						return;
					}

					var content = JSON.parse(content);
					content.id = file;

					contents.push(content);

					async();
				});
			});
		});
	},

	"getBlobs": function(dir, cb)
	{
		var blobDir = path.join(this.dir, dir+".blob");

		this.getFiles(dir, function(err, blobs)
		{
			if (err)
			{
				cb(err);
				return;
			}

			var async = new Async(blobs.length, function()
			{
				cb(undefined, blobs);
			});

			blobs.forEach(function(blob)
			{
				blob.readStream = fs.createReadStream(path.join(blobDir, blob.id));
				async();
			});
		});
	}
}
