'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class ExplorerRow extends _react.Component {
	getChildContext() {
		return {
			isCollapsed: this.props.isCollapsed
		};
	}
	render() {
		const _props = this.props,
		      { className, gutter, isCollapsed, style = {} } = _props,
		      incidentalProps = _objectWithoutProperties(_props, ['className', 'gutter', 'isCollapsed', 'style']);
		const __style__ = isCollapsed ? style : _extends({
			display: 'flex',
			flexWrap: 'wrap',
			marginLeft: gutter * -1,
			marginRight: gutter * -1
		}, style);
		const __className__ = 'ExplorerRow' + (className ? ' ' + className : '');

		return _react2.default.createElement('div', _extends({}, incidentalProps, {
			className: __className__,
			style: __style__
		}));
	}
};
ExplorerRow.childContextTypes = {
	isCollapsed: _react.PropTypes.bool
};
ExplorerRow.propTypes = {
	className: _react.PropTypes.string,
	gutter: _react.PropTypes.number,
	style: _react.PropTypes.string
};
ExplorerRow.defaultProps = {
	gutter: 10
};

module.exports = ExplorerRow;