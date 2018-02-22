'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _elemental = require('elemental');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('./lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Component = _Field2.default.create({

	propTypes: {
		onChange: _react.PropTypes.func.isRequired,
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.number
	},

	valueChanged(event) {
		const newValue = event.target.value.replace(/[^\d\,\.]/g, '');
		const { forceInteger, path, value } = this.props;
		if (newValue === value) return;

		if (!newValue) {
			return this.props.onChange({
				path,
				value: ''
			});
		}

		// quick and dirty hack to allow float values
		this.endWithPoint = !forceInteger && newValue && newValue.length && newValue[newValue.length - 1] === '.';
		this.props.onChange({
			path,
			value: forceInteger ? parseInt(newValue * 100) : newValue * 100
		});
	},

	renderField() {
		const { disabled, forceInteger, path, taxIncluded, value } = this.props;
		const buttonType = disabled ? 'default' : 'hollow-primary';
		const name = this.getInputName(path);

		const taxGroup = taxIncluded ? _react2.default.createElement(
			_elemental.InputGroup.Section,
			null,
			_react2.default.createElement(
				_elemental.Button,
				{ type: buttonType },
				'IVA included'
			)
		) : null;

		return _react2.default.createElement(
			_elemental.InputGroup,
			{ contiguous: true, style: { marginBottom: 0, color: 'red' } },
			_react2.default.createElement(
				_elemental.InputGroup.Section,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ type: buttonType },
					'$'
				)
			),
			_react2.default.createElement(
				_elemental.InputGroup.Section,
				{ grow: true },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					disabled: disabled,
					name: name,
					value: `${(0, _lib.formatNumber)(value, forceInteger)}${this.endWithPoint ? '.' : ''}`,
					onChange: this.valueChanged })
			),
			taxGroup
		);
	}

});

exports.default = Component;


module.exports = Component;