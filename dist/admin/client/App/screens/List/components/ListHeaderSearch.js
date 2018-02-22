'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../../utils/color');

var _elemental = require('../../../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ListHeaderSearch(_ref) {
	let {
		focusInput,
		handleChange,
		handleClear,
		handleKeyup,
		value
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['focusInput', 'handleChange', 'handleClear', 'handleKeyup', 'value']);

	return _react2.default.createElement(
		'div',
		_extends({}, props, { className: (0, _noImportant.css)(classes.wrapper) }),
		_react2.default.createElement(_elemental.FormInput, {
			'data-search-input-field': true,
			onChange: handleChange,
			onKeyUp: handleKeyup,
			placeholder: 'Search',
			value: value
		}),
		_react2.default.createElement(
			'button',
			{
				className: (0, _noImportant.css)(classes.icon, !!value.length && classes.iconWhenClear),
				'data-search-input-field-clear-icon': true,
				disabled: !value.length,
				onClick: value.length && handleClear,
				title: 'Clear search query',
				type: 'button'
			},
			_react2.default.createElement(_elemental.Glyph, { name: value.length ? 'x' : 'search' })
		)
	);
};

ListHeaderSearch.propTypes = {
	focusInput: _react.PropTypes.bool,
	handleChange: _react.PropTypes.func.isRequired,
	handleClear: _react.PropTypes.func.isRequired,
	handleKeyup: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string
};

const clearHoverAndFocusStyles = {
	color: _theme2.default.color.danger,
	outline: 0,
	textDecoration: 'none'
};

const classes = _noImportant.StyleSheet.create({
	wrapper: {
		position: 'relative'
	},
	icon: {
		background: 'none',
		border: 'none',
		color: _theme2.default.color.gray40,
		height: '100%',
		position: 'absolute',
		right: 0,
		textAlign: 'center',
		top: 0,
		width: '2.2em',
		zIndex: 2 },
	iconWhenClear: {
		':hover': clearHoverAndFocusStyles,
		':focus': clearHoverAndFocusStyles,
		':active': {
			color: (0, _color.darken)(_theme2.default.color.danger, 10)
		}
	}
});

module.exports = ListHeaderSearch;