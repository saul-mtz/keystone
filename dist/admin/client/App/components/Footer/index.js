'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _elemental = require('../../elemental');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The global Footer, displays a link to the website and the current Keystone
 * version in use
 */

var Footer = _react2.default.createClass({
	displayName: 'Footer',
	propTypes: {
		appversion: _react2.default.PropTypes.string,
		backUrl: _react2.default.PropTypes.string,
		brand: _react2.default.PropTypes.string,
		user: _react2.default.PropTypes.object,
		User: _react2.default.PropTypes.object, // eslint-disable-line react/sort-prop-types
		version: _react2.default.PropTypes.string
	},
	// Render the user
	renderUser() {
		const { User, user } = this.props;
		if (!user) return null;

		return _react2.default.createElement(
			'span',
			null,
			_react2.default.createElement(
				'span',
				null,
				' Signed in as '
			),
			_react2.default.createElement(
				'a',
				{ href: `${Keystone.adminPath}/${User.path}/${user.id}`, tabIndex: '-1', className: (0, _noImportant.css)(classes.link) },
				user.name
			),
			_react2.default.createElement(
				'span',
				null,
				'.'
			)
		);
	},
	render() {
		const { backUrl, brand, appversion, version } = this.props;

		return _react2.default.createElement(
			'footer',
			{ className: (0, _noImportant.css)(classes.footer), 'data-keystone-footer': true },
			_react2.default.createElement(
				_elemental.Container,
				null,
				_react2.default.createElement(
					'a',
					{
						href: backUrl,
						tabIndex: '-1',
						className: (0, _noImportant.css)(classes.link)
					},
					brand + (appversion ? ' ' + appversion : '')
				),
				_react2.default.createElement(
					'span',
					null,
					' powered by '
				),
				_react2.default.createElement(
					'a',
					{
						href: 'http://keystonejs.com',
						target: '_blank',
						className: (0, _noImportant.css)(classes.link),
						tabIndex: '-1'
					},
					'KeystoneJS'
				),
				_react2.default.createElement(
					'span',
					null,
					' version ',
					version,
					'.'
				),
				this.renderUser()
			)
		);
	}
});

/* eslint quote-props: ["error", "as-needed"] */
const linkHoverAndFocus = {
	color: _theme2.default.color.gray60,
	outline: 'none'
};
const classes = _noImportant.StyleSheet.create({
	footer: {
		boxShadow: '0 -1px 0 rgba(0, 0, 0, 0.1)',
		color: _theme2.default.color.gray40,
		fontSize: _theme2.default.font.size.small,
		paddingBottom: 30,
		paddingTop: 40,
		textAlign: 'center'
	},
	link: {
		color: _theme2.default.color.gray60,

		':hover': linkHoverAndFocus,
		':focus': linkHoverAndFocus
	}
});

module.exports = Footer;