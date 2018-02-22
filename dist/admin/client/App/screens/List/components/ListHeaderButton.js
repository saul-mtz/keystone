'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ListHeaderButton(_ref) {
	let { className, label, glyph } = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'label', 'glyph']);

	return _react2.default.createElement(
		_elemental.DropdownButton,
		_extends({ block: true }, props),
		_react2.default.createElement(_elemental.Glyph, { name: glyph, aphroditeStyles: classes.glyph }),
		_react2.default.createElement(
			'span',
			{ className: (0, _noImportant.css)(classes.label) },
			label
		)
	);
};

ListHeaderButton.propTypes = {
	glyph: _react.PropTypes.string.isRequired
};

// show an icon on small screens where real estate is precious
// otherwise render the label
const classes = _noImportant.StyleSheet.create({
	glyph: {
		'display': 'none',

		'@media (max-width: 500px)': {
			display: 'inline-block'
		}
	},
	label: {
		'display': 'inline-block',

		'@media (max-width: 500px)': {
			display: 'none'
		}
	}
});

module.exports = ListHeaderButton;