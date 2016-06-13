'use strict';

const Q = require('q');
const knox = require('knox');

const ImageUploaderBack = function(options) {
	var deferred = Q.defer();
	var buf = new Buffer(options.dataUri.replace(/^data:image\/\w+;base64,/, ""),'base64'));

	knoxClient = knox.createClient({
		key: '',
		secret: '',
		bucket: ''
	});

	// put to a path in our bucket, and make readable by the public
  req = knoxClient.put('/images/' + options.filename, {
   'Content-Length': buf.length,
   'Content-Type': options.filetype,
   'x-amz-acl': 'public-read'
  });

  req.on('response', function(res) {
    if (res.statusCode === 200) {
      deferred.resolve(req.url);
    } else
      deferred.reject({error: 'true'});
  });

  req.end(buf);
  return deferred.promise;
}

module.exports = ImageUploaderBack;
