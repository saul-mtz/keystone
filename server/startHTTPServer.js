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

const http = require('http');

module.exports = function (keystone, app, callback) {

	const host = keystone.get('host');
	const port = keystone.get('port');

	keystone.httpServer = http
	.createServer(app)
	.listen(port, host, function ready (err) {
		if (err) { return callback(err); }
		const version = process.env.npm_package_version ? ` v${process.env.npm_package_version}` : '';
		const message = `${keystone.get('name')} is ready on http://${host}:${port}/${keystone.get('admin path')}${version}`;
		callback(null, message);
	});
};
