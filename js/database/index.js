var path = require("path");
var fs = require("fs");

function Async(count, cb)
{
	return function()
	{
		--count;
		if (count == 0)
			cb();
	}
}

function verify(table, content)
{
	for (var i in table)
	{
		if (content[i] === undefined)
			return false;
	}

	return true;
}

module.exports = function(root)
{
	this.root = root;
	this.schema = JSON.parse(fs.readFileSync(path.join(root, "schema.json")));
	this.nextIndex = [];

	//loop over tables in schema.json
	for (var i in this.schema.tables)
	{
		var dir = path.join(root, i);

		//create table directory if it doesn't exist yet
		if (!fs.existsSync(dir))
		{
			fs.mkdirSync(dir);
			fs.writeFileSync(path.join(dir, "index"), "1");
		}

		//create table blob directory if it doesn't exist yet
		if (!fs.existsSync(dir+".blob"))
			fs.mkdirSync(dir+".blob");

		//get next index
		this.nextIndex[i] = fs.readFileSync(path.join(dir, "index"));
	};
}

module.exports.prototype =
{
	"getNextIndex": function(table)
	{
		return this.nextIndex[table];
	},

	"pushFile": function(table, content, cb)
	{
		var self = this;

		if (!verify(self.schema[table], content))
			return cb("Incorrect number of arguments.");

		var index = self.nextIndex[table];
		++self.nextIndex[table];

		var dir = path.join(self.root, table);

		var error = false;

		var async = new Async(2, function(err)
		{
			cb(error, index);
		});

		var stringified = JSON.stringify(content);
		fs.writeFile(path.join(dir, index), stringified, function(err)
		{
			if (err) error = err;
			async();
		});

		fs.writeFile(path.join(dir, "index", index+1), function(err)
		{
			if (err) error = err;
			async();
		});
	},

	"pushBlob": function(table, content, readStream, cb)
	{
		var self = this;

		self.pushFile(table, content, function(err, index)
		{
			var dir = path.join(self.root, table+".blob");

			var writeStream = fs.createWriteStream(path.join(dir, index));
			readStream.pipe(writeStream);

			readStream.on("end", function()
			{
				cb(false, index);
			});
		});
	},

	"getFile": function(table, index, cb)
	{
		var self = this;

		fs.readFile(path.join(self.root, table, index), function(err, content)
		{
			if (err)
				return cb(err);

			var file = JSON.parse(content);
			file.index = index;

			cb(false, file);
		});
	},

	"getFiles": function(table, cb)
	{
		var self = this;

		fs.readdir(path.join(self.root, table), function(err, indexes)
		{
			if (err)
				return cb(err);

			var arr = [];
			var error = false;

			var async = new Async(indexes.length, function()
			{
				cb(err, arr.sort(function(x, y)
				{
					return x.sort > y.sort ? 1 : -1;
				}));
			});

			indexes.forEach(function(index)
			{
				self.getFile(table, index, function(err, result)
				{
					if (err)
						return error = err;

					arr.push(result);
				});
			});
		});
	},

	"getBlob": function(table, index, cb)
	{
		var self = this;

		self.getFile(table, index, function(err, result)
		{
			if (err)
				return cb(err);

			var dir = path.join(self.root, table+".blob");
			result.readStream = fs.createReadStream(path.join(dir, index));

			cb(false, result);
		});
	},

	"getBlobs": function(table, cb)
	{
		var self = this;

		self.getFiles(table, function(err, result)
		{
			result.forEach(function(file)
			{
				var dir = path.join(self.root, table+".blob");
				file.readStream = fs.createReadStream(path.join(dir, file.index));
			});

			cb(err, result);
		});
	},

	"updateFile": function(table, index, content, cb)
	{
		var self = this;

		var fileName = path.join(self.root, table, index);

		fs.readFile(fileName, function(err, file)
		{
			if (err)
				return cb(err);

			var original = JSON.parse(file);

			for (var i in content)
			{
				original[i] = content[i];
			}

			fs.writeFile(fileName, JSON.stringify(original), function(err)
			{
				if (err)
					return cb(err);

				cb(false);
			});
		});
	},

	"deleteFile": function(table, index, cb)
	{
		var self = this;

		var dir = path.join(self.root, table);
		fs.unlink(path.join(dir, index), function(err)
		{
			if (err)
				return cb(err);

			cb(false);
		});
	},

	"deleteBlob": function(table, index, cb)
	{
		var self = this;

		self.deleteFile(table, index, function(err)
		{
			if (err)
				return cb(err);

		var dir = path.join(self.root, table+".blob");
			fs.unlink(path.join(dir, index), function(err)
			{
				if (err)
					return cb(err);

				cb(false);
			});
		});
	}
}
