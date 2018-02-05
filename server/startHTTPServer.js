/**
 * Configures and starts express server.
 *
 * Events are fired during initialisation to allow customisation, including:
 *   - onHttpServerCreated
 *
 * consumed by lib/core/start.js
 *
 * @api private
 */

var http = require('http');

module.exports = function (keystone, app, callback) {

	var host = keystone.get('host');
	var port = keystone.get('port');

	keystone.httpServer = http
	.createServer(app)
	.listen(port, host, function ready (err) {
		if (err) { return callback(err); }
		var message = `${keystone.get('name')} is ready on http://${host}:${port}/${keystone.get('admin path')}`;
		callback(null, message);
	});
};
