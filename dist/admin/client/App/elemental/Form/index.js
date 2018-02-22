'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const classes = _noImportant.StyleSheet.create(_styles2.default);

class Form extends _react.Component {
	getChildContext() {
		return {
			formLayout: this.props.layout,
			labelWidth: this.props.labelWidth
		};
	}
	render() {
		// NOTE `labelWidth` is declared to remove it from `props`, though never used
		const _props = this.props,
		      {
			className,
			component: Component,
			labelWidth, // eslint-disable-line no-unused-vars
			layout
		} = _props,
		      props = _objectWithoutProperties(_props, ['className', 'component', 'labelWidth', 'layout']);

		props.className = (0, _noImportant.css)(classes.Form, classes['Form__' + layout], className);

		return _react2.default.createElement(Component, props);
	}
};

Form.childContextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
Form.propTypes = {
	children: _react.PropTypes.node.isRequired,
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	layout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline'])
};
Form.defaultProps = {
	component: 'form',
	layout: 'basic'
};

module.exports = Form;