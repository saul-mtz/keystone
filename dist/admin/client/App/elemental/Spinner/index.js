'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _ScreenReaderOnly = require('../ScreenReaderOnly');

var _ScreenReaderOnly2 = _interopRequireDefault(_ScreenReaderOnly);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Spinner(_ref) {
	let { className, size, color } = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'size', 'color']);

	props.className = (0, _noImportant.css)(classes.base, classes[size], className);

	return _react2.default.createElement(
		'div',
		props,
		_react2.default.createElement('span', { className: `${(0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__first)}` }),
		_react2.default.createElement('span', { className: `${(0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__second)}` }),
		_react2.default.createElement('span', { className: `${(0, _noImportant.css)(classes.dot, classes['size__' + size], classes['color__' + color], classes.dot__third)}` }),
		_react2.default.createElement(
			_ScreenReaderOnly2.default,
			null,
			'Loading...'
		)
	);
};

Spinner.propTypes = {
	color: _react.PropTypes.oneOf(_colors2.default),
	size: _react.PropTypes.oneOf(_sizes2.default)
};
Spinner.defaultProps = {
	size: 'medium',
	color: 'default'
};

const classes = _noImportant.StyleSheet.create(_styles2.default);

module.exports = Spinner;