'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _FormLabel = require('../FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const classes = _noImportant.StyleSheet.create(_styles2.default);

class FormField extends _react.Component {
	constructor() {
		super();
		this.formFieldId = generateId();
	}
	getChildContext() {
		return {
			formFieldId: this.formFieldId
		};
	}
	render() {
		const { formLayout = 'basic', labelWidth } = this.context;
		const _props = this.props,
		      {
			aphroditeStyles,
			children,
			className,
			cropLabel,
			htmlFor,
			label,
			offsetAbsentLabel
		} = _props,
		      props = _objectWithoutProperties(_props, ['aphroditeStyles', 'children', 'className', 'cropLabel', 'htmlFor', 'label', 'offsetAbsentLabel']);

		props.className = (0, _noImportant.css)(classes.FormField, classes['FormField--form-layout-' + formLayout], offsetAbsentLabel ? classes['FormField--offset-absent-label'] : null, aphroditeStyles);
		if (className) {
			props.className += ' ' + className;
		}
		if (offsetAbsentLabel && labelWidth) {
			props.style = _extends({
				paddingLeft: labelWidth
			}, props.style);
		}

		// elements
		const componentLabel = label ? _react2.default.createElement(
			_FormLabel2.default,
			{ htmlFor: htmlFor, cropText: cropLabel },
			label
		) : null;

		return _react2.default.createElement(
			'div',
			_extends({}, props, { htmlFor: htmlFor }),
			componentLabel,
			children
		);
	}
};

const stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormField.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
FormField.childContextTypes = {
	formFieldId: _react.PropTypes.string
};
FormField.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	children: _react.PropTypes.node,
	cropLabel: _react.PropTypes.bool,
	htmlFor: _react2.default.PropTypes.string,
	label: _react2.default.PropTypes.string,
	offsetAbsentLabel: _react2.default.PropTypes.bool
};

function generateId() {
	return Math.random().toString(36).substr(2, 9);
};

module.exports = FormField;