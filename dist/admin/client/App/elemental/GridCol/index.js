'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WIDTHS = {
	'one-whole': '100%',
	'one-half': '50%',
	'one-third': '33.33%',
	'two-thirds': '66.66%',
	'one-quarter': '25%',
	'three-quarters': '75%',

	'one-fifth': '20%',
	'two-fifths': '40%',
	'three-fifths': '60%',
	'four-fifths': '80%',

	'one-sixth': '16.66%',
	'five-sixths': '83.33%'
};

const GridCol = (props, context) => {
	const gutter = props.gutter || context.gutter;
	const xsmall = props.xsmall || context.xsmall;
	const small = props.small || context.small;
	const medium = props.medium || context.medium;
	const large = props.large || context.large;

	const className = (0, _noImportant.css)(classes['xsmall-' + xsmall], classes['small-' + small], classes['medium-' + medium], classes['large-' + large]);

	const componentClassName = `${className}${props.className ? ' ' + props.className : ''}`;
	const componentStyles = gutter ? {
		paddingLeft: gutter / 2,
		paddingRight: gutter / 2
	} : {};

	return _react2.default.createElement(
		'div',
		{ className: componentClassName, style: componentStyles },
		props.children
	);
};

GridCol.contextTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridCol.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

const classes = _noImportant.StyleSheet.create(_extends({}, prepareWidths('xsmall', WIDTHS), prepareWidths('small', WIDTHS), prepareWidths('medium', WIDTHS), prepareWidths('large', WIDTHS)));

/* eslint-disable guard-for-in */
function prepareWidths(prefix, obj) {
	let classes = {};
	switch (prefix) {
		case 'small':
			for (let prop in obj) {
				classes[prefix + '-' + prop] = {
					[`@media (min-width: ${_theme2.default.breakpoint.tabletPortraitMin})`]: {
						width: obj[prop]
					}
				};
			}
			break;
		case 'medium':
			for (let prop in obj) {
				classes[prefix + '-' + prop] = {
					[`@media (min-width: ${_theme2.default.breakpoint.tabletLandscapeMin})`]: {
						width: obj[prop]
					}
				};
			}
			break;
		case 'large':
			for (let prop in obj) {
				classes[prefix + '-' + prop] = {
					[`@media (min-width: ${_theme2.default.breakpoint.desktopMin})`]: {
						width: obj[prop]
					}
				};
			}
			break;
		default:
			for (let prop in obj) {
				classes[prefix + '-' + prop] = {
					width: obj[prop]
				};
			}

	}

	return classes;
};

module.exports = GridCol;