'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./screens/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Item = require('./screens/Item');

var _Item2 = _interopRequireDefault(_Item);

var _List = require('./screens/List');

var _List2 = _interopRequireDefault(_List);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _lists = require('../utils/lists');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sync the browser history to the Redux store
const history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, _store2.default);

// Initialise Keystone.User list
/**
 * This is the main entry file, which we compile the main JS bundle from. It
 * only contains the client side routing setup.
 */

// Needed for ES6 generators (redux-saga) to work

Keystone.User = _lists.listsByKey[Keystone.userList];

_reactDom2.default.render(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: _store2.default },
	_react2.default.createElement(
		_reactRouter.Router,
		{ history: history },
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: Keystone.adminPath, component: _App2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: ':listId', component: _List2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: ':listId/:itemId', component: _Item2.default })
		)
	)
), document.getElementById('react-root'));