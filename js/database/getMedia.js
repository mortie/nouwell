var fs = require("fs");

module.exports = function(cb)
{
	this.getBlobs("media", cb);
}
