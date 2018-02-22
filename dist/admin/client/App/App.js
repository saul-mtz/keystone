'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('./elemental');

var _reactRouter = require('react-router');

var _noImportant = require('aphrodite/no-important');

var _Mobile = require('./components/Navigation/Mobile');

var _Mobile2 = _interopRequireDefault(_Mobile);

var _Primary = require('./components/Navigation/Primary');

var _Primary2 = _interopRequireDefault(_Primary);

var _Secondary = require('./components/Navigation/Secondary');

var _Secondary2 = _interopRequireDefault(_Secondary);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The App component is the component that is rendered around all views, and
 * contains common things like navigation, footer, etc.
 */

const classes = _noImportant.StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	body: {
		flexGrow: 1
	}
});

const App = props => {
	const listsByPath = require('../utils/lists').listsByPath;
	let children = props.children;
	// If we're on either a list or an item view
	let currentList, currentSection;
	if (props.params.listId) {
		currentList = listsByPath[props.params.listId];
		// If we're on a list path that doesn't exist (e.g. /keystone/gibberishasfw34afsd) this will
		// be undefined
		if (!currentList) {
			children = _react2.default.createElement(
				_elemental.Container,
				null,
				_react2.default.createElement(
					'p',
					null,
					'List not found!'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: `${Keystone.adminPath}` },
					'Go back home'
				)
			);
		} else {
			// Get the current section we're in for the navigation
			currentSection = Keystone.nav.by.list[currentList.key];
		}
	}
	// Default current section key to dashboard
	const currentSectionKey = currentSection && currentSection.key || 'dashboard';
	return _react2.default.createElement(
		'div',
		{ className: (0, _noImportant.css)(classes.wrapper) },
		_react2.default.createElement(
			'header',
			null,
			_react2.default.createElement(_Mobile2.default, {
				brand: Keystone.brand,
				currentListKey: props.params.listId,
				currentSectionKey: currentSectionKey,
				sections: Keystone.nav.sections,
				signoutUrl: Keystone.signoutUrl
			}),
			_react2.default.createElement(_Primary2.default, {
				currentSectionKey: currentSectionKey,
				brand: Keystone.brand,
				sections: Keystone.nav.sections,
				signoutUrl: Keystone.signoutUrl
			}),
			currentSection ? _react2.default.createElement(_Secondary2.default, {
				currentListKey: props.params.listId,
				lists: currentSection.lists,
				itemId: props.params.itemId
			}) : null
		),
		_react2.default.createElement(
			'main',
			{ className: (0, _noImportant.css)(classes.body) },
			children
		),
		_react2.default.createElement(_Footer2.default, {
			appversion: Keystone.appversion,
			backUrl: Keystone.backUrl,
			brand: Keystone.brand,
			User: Keystone.User,
			user: Keystone.user,
			version: Keystone.version
		})
	);
};

module.exports = App;