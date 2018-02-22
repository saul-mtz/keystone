'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _elemental = require('../../admin/client/App/elemental');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function NestedFormField(_ref) {
	let { children, className, label } = _ref,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'label']);

	return _react2.default.createElement(
		_elemental.FormField,
		props,
		_react2.default.createElement(
			_elemental.FormLabel,
			{ aphroditeStyles: classes.label },
			label
		),
		children
	);
};
const classes = _noImportant.StyleSheet.create({
	label: {
		color: _theme2.default.color.gray40,
		fontSize: _theme2.default.font.size.small,

		[`@media (min-width: ${_theme2.default.breakpoint.tabletLandscapeMin})`]: {
			paddingLeft: '1em'
		}
	}
});

module.exports = NestedFormField;