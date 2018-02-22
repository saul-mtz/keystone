'use strict';

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Signin = require('./Signin');

var _Signin2 = _interopRequireDefault(_Signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The signin page, it renders a page with a username and password input form.
 *
 * This is decoupled from the main app (in the "App/" folder) because we inject
 * lots of data into the other screens (like the lists that exist) that we don't
 * want to have injected here, so this is a completely separate route and template.
 */
const params = _qs2.default.parse(window.location.search.replace(/^\?/, ''));
const from = typeof params.from === 'string' && params.from.charAt(0) === '/' ? params.from : undefined;

_reactDom2.default.render(_react2.default.createElement(_Signin2.default, {
	brand: Keystone.brand,
	from: from,
	logo: Keystone.logo,
	user: Keystone.user,
	userCanAccessKeystone: Keystone.userCanAccessKeystone
}), document.getElementById('signin-view'));