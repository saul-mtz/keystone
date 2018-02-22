'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

var _color = require('../../admin/client/utils/color');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FileChangeMessage(_ref) {
	let { style, color } = _ref,
	    props = _objectWithoutProperties(_ref, ['style', 'color']);

	const styles = _extends({
		marginRight: 10,
		minWidth: 0
	}, style);

	if (color !== 'default') {
		styles.backgroundColor = (0, _color.fade)(_theme2.default.color[color], 10);
		styles.borderColor = (0, _color.fade)(_theme2.default.color[color], 30);
		styles.color = _theme2.default.color[color];
	}

	return _react2.default.createElement(_elemental.FormInput, _extends({
		noedit: true,
		style: styles
	}, props));
};

FileChangeMessage.propTypes = {
	color: _react.PropTypes.oneOf(['danger', 'default', 'info', 'success', 'warning'])
};
FileChangeMessage.defaultProps = {
	color: 'default'
};

module.exports = FileChangeMessage;