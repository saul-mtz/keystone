'use strict';

var _elemental = require('../../../admin/client/App/elemental');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'MoneyField',
	propTypes: {
		onChange: _react.PropTypes.func.isRequired,
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.number
	},
	statics: {
		type: 'Money'
	},

	valueChanged(event) {
		var newValue = event.target.value.replace(/[^\d\s\,\.\$€£¥]/g, '');
		if (newValue === this.props.value) return;

		this.props.onChange({
			path: this.props.path,
			value: newValue
		});
	},
	renderField() {
		return _react2.default.createElement(_elemental.FormInput, {
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			value: this.props.value
		});
	}

});