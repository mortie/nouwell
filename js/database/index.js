var path = require("path");
var fs = require("fs");

function Async(count, cb)
{
	return function()
	{
		--count;
		if (count <= 0)
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

	//loop over tables in schema.json
	for (var i in this.schema.tables)
	{
		var dir = path.join(root, i);

		//create table directory if it doesn't exist yet
		if (!fs.existsSync(dir))
		{
			fs.mkdirSync(dir);
			fs.writeFileSync(path.join(dir, "id"), "1");
		}

		//create table blob directory if it doesn't exist yet
		if (!fs.existsSync(dir+".blob"))
			fs.mkdirSync(dir+".blob");
	};
}

module.exports.prototype =
{
	"getNextId": function getNextId(table)
	{
		return parseInt(fs.readFileSync(path.join(this.root, table, "id")));
	},

	"_setNextId": function setNextId(table, id)
	{
		fs.writeFileSync(path.join(this.root, table, "id"), id);
	},

	"pushFile": function pushFile(table, content, cb)
	{
		var self = this;

		if (!verify(self.schema[table], content))
			return cb("Incorrect number of arguments.");

		var id = self.getNextId(table);
		self._setNextId(table, id+1);

		var dir = path.join(self.root, table);
		var stringified = JSON.stringify(content);

		fs.writeFile(path.join(dir, id.toString()), stringified, function fileWritten(err)
		{
			cb(err, id);
		});
	},

	"pushBlob": function pushBlob(table, content, readStream, cb)
	{
		var self = this;

		self.pushFile(table, content, function filePushed(err, id)
		{
			var dir = path.join(self.root, table+".blob");

			var writeStream = fs.createWriteStream(path.join(dir, id));
			readStream.pipe(writeStream);

			readStream.on("end", function blobFileWritten()
			{
				cb(false, id);
			});
		});
	},

	"getFile": function getFile(table, id, cb)
	{
		var self = this;

		fs.readFile(path.join(self.root, table, id), function gotFile(err, content)
		{
			if (err)
				return cb(err);

			var file = JSON.parse(content);
			file.id = id;

			cb(false, file);
		});
	},

	"getFiles": function getFiles(table, cb)
	{
		var self = this;

		fs.readdir(path.join(self.root, table), function gotDir(err, files)
		{
			if (err)
				return cb(err);

			var arr = [];
			var error = false;

			var async = new Async(files.length, function()
			{
				cb(error, arr.sort(function sortFiles(x, y)
				{
					return x.sort > y.sort ? 1 : -1;
				}));
			});

			files.forEach(function loopFiles(id)
			{
				if (isNaN(parseInt(id)))
					return;

				self.getFile(table, id, function gotFile(err, result)
				{
					if (err)
						return error = err;

					arr.push(result);
					async();
				});
			});

			async();
		});
	},

	"getBlob": function getBlob(table, id, cb)
	{
		var self = this;

		self.getFile(table, id, function gotFile(err, result)
		{
			if (err)
				return cb(err);

			var dir = path.join(self.root, table+".blob");
			result.readStream = fs.createReadStream(path.join(dir, id));

			cb(false, result);
		});
	},

	"getBlobs": function getBlobs(table, cb)
	{
		var self = this;

		self.getFiles(table, function gotFiles(err, result)
		{
			result.forEach(function loopFiles(file)
			{
				var dir = path.join(self.root, table+".blob");
				file.readStream = fs.createReadStream(path.join(dir, file.id));
			});

			cb(err, result);
		});
	},

	"updateFile": function updateFile(table, id, content, cb)
	{
		var self = this;

		var fileName = path.join(self.root, table, id);

		fs.readFile(fileName, function gotFile(err, file)
		{
			if (err)
				return cb(err);

			var original = JSON.parse(file);

			for (var i in content)
			{
				original[i] = content[i];
			}

			fs.writeFile(fileName, JSON.stringify(original), function writtenFile(err)
			{
				if (err)
					return cb(err);

				cb(false);
			});
		});
	},

	"deleteFile": function deleteFile(table, id, cb)
	{
		var self = this;

		var dir = path.join(self.root, table);
		fs.unlink(path.join(dir, id), function unlinkedFile(err)
		{
			if (err)
				return cb(err);

			cb(false);
		});
	},

	"deleteBlob": function deleteBlob(table, id, cb)
	{
		var self = this;

		self.deleteFile(table, id, function deletedFile(err)
		{
			if (err)
				return cb(err);

			var dir = path.join(self.root, table+".blob");
			fs.unlink(path.join(dir, id), function unlinkedBlob(err)
			{
				if (err)
					return cb(err);

				cb(false);
			});
		});
	}
}
