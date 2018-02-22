'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Checkbox = require('../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NOOP = () => {};

module.exports = _Field2.default.create({
	displayName: 'BooleanField',
	statics: {
		type: 'Boolean'
	},
	propTypes: {
		indent: _react2.default.PropTypes.bool,
		label: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string.isRequired,
		value: _react2.default.PropTypes.bool
	},

	valueChanged(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	renderFormInput() {
		if (!this.shouldRenderField()) return;

		return _react2.default.createElement('input', {
			name: this.getInputName(this.props.path),
			type: 'hidden',
			value: !!this.props.value
		});
	},
	renderUI() {
		const { indent, value, label, path } = this.props;

		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'boolean' },
			_react2.default.createElement(
				_elemental.FormField,
				{ offsetAbsentLabel: indent },
				_react2.default.createElement(
					'label',
					{ style: { height: '2.3em' } },
					this.renderFormInput(),
					_react2.default.createElement(_Checkbox2.default, {
						checked: value,
						onChange: this.shouldRenderField() && this.valueChanged || NOOP,
						readonly: !this.shouldRenderField()
					}),
					_react2.default.createElement(
						'span',
						{ style: { marginLeft: '.75em' } },
						label
					)
				),
				this.renderNote()
			)
		);
	}
});