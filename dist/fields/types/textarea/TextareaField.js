'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'TextareaField',
	statics: {
		type: 'Textarea'
	},
	renderValue() {
		const { height } = this.props;

		const styles = {
			height: height,
			whiteSpace: 'pre-wrap',
			overflowY: 'auto'
		};
		return _react2.default.createElement(
			_elemental.FormInput,
			{ multiline: true, noedit: true, style: styles },
			this.props.value
		);
	},
	renderField() {
		const { height, path, style, value } = this.props;

		const styles = _extends({
			height: height
		}, style);

		return _react2.default.createElement(_elemental.FormInput, {
			autoComplete: 'off',
			multiline: true,
			name: this.getInputName(path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			style: styles,
			value: value
		});
	}
});