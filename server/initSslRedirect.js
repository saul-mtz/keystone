module.exports = function (keystone, app) {
	function sslRedirect (req, res, next) {
		const proto = req.headers['x-forwarded-proto'];
		if (proto === 'https') {
			next();
		} else {
			// Don't redirect connections from localhost
			if (req.ip === '127.0.0.1') {
				return next();
			} else {
				console.error('redirect to https://' + req.hostname + req.originalUrl);
				res.redirect('https://' + req.hostname + req.originalUrl);
			}
		}
	};
	app.use(sslRedirect);
};
