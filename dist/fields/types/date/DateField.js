'use strict';

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
TODO: Implement yearRange Prop, or deprecate for max / min values (better)
*/

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD';
const DEFAULT_FORMAT_STRING = 'Do MMM YYYY';

module.exports = _Field2.default.create({
	displayName: 'DateField',
	statics: {
		type: 'Date'
	},
	propTypes: {
		formatString: _react2.default.PropTypes.string,
		inputFormat: _react2.default.PropTypes.string,
		label: _react2.default.PropTypes.string,
		note: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},

	getDefaultProps() {
		return {
			formatString: DEFAULT_FORMAT_STRING,
			inputFormat: DEFAULT_INPUT_FORMAT
		};
	},
	valueChanged({ value }) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	moment(value) {
		var m = (0, _moment2.default)(value);
		if (this.props.isUTC) m.utc();
		return m;
	},
	isValid(value) {
		return this.moment(value, this.inputFormat).isValid();
	},
	format(value) {
		return value ? this.moment(value).format(this.props.formatString) : '';
	},
	setToday() {
		this.valueChanged({
			value: this.moment(new Date()).format(this.props.inputFormat)
		});
	},
	renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.format(this.props.value)
		);
	},
	renderField() {
		let value = this.moment(this.props.value);
		value = this.props.value && value.isValid() ? value.format(this.props.inputFormat) : this.props.value;
		return _react2.default.createElement(
			_elemental.InlineGroup,
			null,
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_DateInput2.default, {
					format: this.props.inputFormat,
					name: this.getInputName(this.props.path),
					onChange: this.valueChanged,
					ref: 'dateInput',
					value: value
				})
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.setToday },
					'Today'
				)
			)
		);
	}

});