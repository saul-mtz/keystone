'use strict';

module.exports = function (keystone, app) {
	function sslRedirect(req, res, next) {
		const proto = req.headers['x-forwarded-proto'];
		if (proto === 'https') {
			next();
		} else {
			const { hostname, ip, originalUrl } = req;
			if (ip === '127.0.0.1') {
				// Don't redirect connections from localhost
				return next();
			} else if (/^10\.0\.[\d\.]+$/.test(ip)) {
				// AWS EBL: query for healthchecks
				console.log(`AWS EBL? req.ip: ${ip}, req.hostname: ${hostname}`);
				return next();
			} else {
				const redirectTo = `https://${hostname}${originalUrl}`;
				console.error(`req.ip: ${ip}, req.hostname: ${hostname}, redirect to ${redirectTo}`);
				res.redirect(redirectTo);
			}
		}
	};
	app.use(sslRedirect);
};