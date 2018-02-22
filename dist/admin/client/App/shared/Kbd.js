'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Kbd(_ref) {
	let { className } = _ref,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _noImportant.css)(classes.kbd);

	return _react2.default.createElement('kbd', props);
};

const classes = _noImportant.StyleSheet.create({
	kbd: {
		backgroundColor: _theme2.default.color.body,
		borderRadius: 3,
		border: `1px solid #ccc`,
		borderBottomColor: (0, _color.darken)('#ccc', 4),
		borderTopColor: (0, _color.lighten)('#ccc', 4),
		boxShadow: `0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset`,
		display: 'inline-block',
		fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
		fontSize: '0.85em',
		fontWeight: 700,
		lineHeight: 'inherit',
		padding: '1px 4px',
		whiteSpace: 'nowrap',

		// little hack to tweak "visual-middle" alignment
		position: 'relative',
		top: -1
	}
});

module.exports = Kbd;