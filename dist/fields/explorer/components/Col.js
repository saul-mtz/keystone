'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const ExplorerCol = (props, context) => {
	const { className, gutter, style = {}, width } = props,
	      incidentalProps = _objectWithoutProperties(props, ['className', 'gutter', 'style', 'width']);
	const { isCollapsed } = context;
	const __style__ = isCollapsed ? style : _extends({
		flex: width ? null : '1 1 0',
		minHeight: 1,
		paddingLeft: gutter,
		paddingRight: gutter,
		width: width || '100%'
	}, style);
	const __className__ = 'ExplorerCol' + (className ? ' ' + className : '');

	return _react2.default.createElement('div', _extends({}, incidentalProps, {
		className: __className__,
		style: __style__
	}));
};
ExplorerCol.contextTypes = {
	isCollapsed: _react.PropTypes.bool
};
ExplorerCol.propTypes = {
	className: _react.PropTypes.string,
	gutter: _react.PropTypes.number,
	style: _react.PropTypes.string,
	width: _react.PropTypes.number
};
ExplorerCol.defaultProps = {
	gutter: 10
};

module.exports = ExplorerCol;