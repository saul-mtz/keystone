'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _elemental = require('../../../elemental');

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function DrilldownItem(_ref) {
	let { className, href, label, separate, separator, style } = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'href', 'label', 'separate', 'separator', 'style']);

	props.className = (0, _noImportant.css)(classes.item, className);

	// remove horizontal padding
	const styles = _extends({
		paddingLeft: 0,
		paddingRight: 0
	}, style);

	return _react2.default.createElement(
		'li',
		props,
		_react2.default.createElement(
			_elemental.Button,
			{
				component: _reactRouter.Link,
				style: styles,
				to: href,
				variant: 'link'
			},
			label
		),
		separate && _react2.default.createElement(
			'span',
			{ className: (0, _noImportant.css)(classes.separator) },
			separator
		)
	);
};

DrilldownItem.propTypes = {
	href: _react.PropTypes.string.isRequired,
	label: _react.PropTypes.string.isRequired,
	separate: _react.PropTypes.bool, // FIXME verb; could be better
	separator: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string])
};
DrilldownItem.defaultProps = {
	separator: _react2.default.createElement(_elemental.Glyph, { name: 'chevron-right' })
};

const classes = _noImportant.StyleSheet.create({
	item: {
		display: 'inline-block',
		margin: 0,
		padding: 0,
		verticalAlign: 'middle'
	},
	separator: {
		color: _theme2.default.color.gray40,
		marginLeft: '0.5em',
		marginRight: '0.5em'
	}
});

module.exports = DrilldownItem;