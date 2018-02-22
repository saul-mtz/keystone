'use strict';

var _reactColor = require('react-color');

var _noImportant = require('aphrodite/no-important');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _transparentSwatch = require('./transparent-swatch');

var _transparentSwatch2 = _interopRequireDefault(_transparentSwatch);

var _theme = require('../../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ColorField = _Field2.default.create({
	displayName: 'ColorField',
	statics: {
		type: 'Color'
	},
	propTypes: {
		onChange: _react2.default.PropTypes.func,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},

	getInitialState() {
		return {
			displayColorPicker: false
		};
	},
	updateValue(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	handleInputChange(event) {
		var newValue = event.target.value;
		if (/^([0-9A-F]{3}){1,2}$/.test(newValue)) {
			newValue = '#' + newValue;
		}
		if (newValue === this.props.value) return;

		this.updateValue(newValue);
	},
	handleClick() {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	},
	handleClose() {
		this.setState({ displayColorPicker: false });
	},
	handlePickerChange(color) {
		var newValue = color.hex;

		if (newValue === this.props.value) return;

		this.updateValue(newValue);
	},
	renderSwatch() {
		const className = `${(0, _noImportant.css)(classes.swatch)} e2e-type-color__swatch`;

		return this.props.value ? _react2.default.createElement('span', {
			className: className,
			style: { backgroundColor: this.props.value }
		}) : _react2.default.createElement('span', {
			className: className,
			dangerouslySetInnerHTML: { __html: _transparentSwatch2.default }
		});
	},
	renderField() {
		const { displayColorPicker } = this.state;

		return _react2.default.createElement(
			'div',
			{ className: 'e2e-type-color__wrapper', style: { position: 'relative' } },
			_react2.default.createElement(
				_elemental.InlineGroup,
				null,
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					{ grow: true },
					_react2.default.createElement(_elemental.FormInput, {
						autoComplete: 'off',
						name: this.getInputName(this.props.path),
						onChange: this.valueChanged,
						ref: 'field',
						value: this.props.value
					})
				),
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					null,
					_react2.default.createElement(
						_elemental.Button,
						{ onClick: this.handleClick, aphroditeStyles: classes.button, 'data-e2e-type-color__button': true },
						this.renderSwatch()
					)
				)
			),
			displayColorPicker && _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('div', {
					className: (0, _noImportant.css)(classes.blockout),
					'data-e2e-type-color__blockout': true,
					onClick: this.handleClose
				}),
				_react2.default.createElement(
					'div',
					{ className: (0, _noImportant.css)(classes.popover), onClick: e => e.stopPropagation(), 'data-e2e-type-color__popover': true },
					_react2.default.createElement(_reactColor.SketchPicker, {
						color: this.props.value,
						onChangeComplete: this.handlePickerChange,
						onClose: this.handleClose
					})
				)
			)
		);
	}
});

/* eslint quote-props: ["error", "as-needed"] */
const classes = _noImportant.StyleSheet.create({
	button: {
		background: 'white',
		padding: 4,
		width: _theme2.default.component.height,

		':hover': {
			background: 'white'
		}
	},
	blockout: {
		bottom: 0,
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 1
	},
	popover: {
		marginTop: 10,
		position: 'absolute',
		left: 0,
		zIndex: 2
	},
	swatch: {
		borderRadius: 1,
		boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
		display: 'block',
		height: '100%',
		width: '100%'
	}
});

module.exports = ColorField;