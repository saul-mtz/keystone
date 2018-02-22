'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'URLField',
	statics: {
		type: 'Url'
	},
	openValue() {
		var href = this.props.value;
		if (!href) return;
		if (!/^(mailto\:)|(\w+\:\/\/)/.test(href)) {
			href = 'http://' + href;
		}
		window.open(href);
	},
	renderLink() {
		if (!this.props.value) return null;

		return _react2.default.createElement(_elemental.GlyphButton, {
			className: 'keystone-relational-button',
			glyph: 'link',
			onClick: this.openValue,
			title: 'Open ' + this.props.value + ' in a new tab',
			variant: 'link'
		});
	},
	renderField() {
		return _react2.default.createElement(_elemental.FormInput, {
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			type: 'url',
			value: this.props.value
		});
	},
	wrapField() {
		return _react2.default.createElement(
			'div',
			{ style: { position: 'relative' } },
			this.renderField(),
			this.renderLink()
		);
	},
	renderValue() {
		const { value } = this.props;
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true, onClick: value && this.openValue },
			value
		);
	}
});