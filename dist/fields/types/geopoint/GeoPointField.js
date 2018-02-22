'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'GeopointField',
	statics: {
		type: 'Geopoint'
	},

	focusTargetRef: 'lat',

	handleLat(event) {
		const { value = [], path, onChange } = this.props;
		const newVal = event.target.value;
		onChange({
			path,
			value: [value[0], newVal]
		});
	},

	handleLong(event) {
		const { value = [], path, onChange } = this.props;
		const newVal = event.target.value;
		onChange({
			path,
			value: [newVal, value[1]]
		});
	},

	renderValue() {
		const { value } = this.props;
		if (value && value[1] && value[0]) {
			return _react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true },
				value[1],
				', ',
				value[0]
			); // eslint-disable-line comma-spacing
		}
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			'(not set)'
		);
	},

	renderField() {
		const { value = [], path } = this.props;
		return _react2.default.createElement(
			_elemental.Grid.Row,
			{ xsmall: 'one-half', gutter: 10 },
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(path + '[1]'),
					onChange: this.handleLat,
					placeholder: 'Latitude',
					ref: 'lat',
					value: value[1]
				})
			),
			_react2.default.createElement(
				_elemental.Grid.Col,
				{ width: 'one-half' },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(path + '[0]'),
					onChange: this.handleLong,
					placeholder: 'Longitude',
					ref: 'lng',
					value: value[0]
				})
			)
		);
	}

});