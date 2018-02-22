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

module.exports = _Field2.default.create({

	displayName: 'DatetimeField',
	statics: {
		type: 'Datetime'
	},

	focusTargetRef: 'dateInput',

	// default input formats
	dateInputFormat: 'YYYY-MM-DD',
	timeInputFormat: 'h:mm:ss a',
	tzOffsetInputFormat: 'Z',

	// parse formats (duplicated from lib/fieldTypes/datetime.js)
	parseFormats: ['YYYY-MM-DD', 'YYYY-MM-DD h:m:s a', 'YYYY-MM-DD h:m a', 'YYYY-MM-DD H:m:s', 'YYYY-MM-DD H:m'],

	getInitialState() {
		return {
			dateValue: this.props.value && this.moment(this.props.value).format(this.dateInputFormat),
			timeValue: this.props.value && this.moment(this.props.value).format(this.timeInputFormat),
			tzOffsetValue: this.props.value ? this.moment(this.props.value).format(this.tzOffsetInputFormat) : this.moment().format(this.tzOffsetInputFormat)
		};
	},

	getDefaultProps() {
		return {
			formatString: 'Do MMM YYYY, h:mm:ss a'
		};
	},

	moment() {
		if (this.props.isUTC) return _moment2.default.utc.apply(_moment2.default, arguments);else return _moment2.default.apply(undefined, arguments);
	},

	// TODO: Move isValid() so we can share with server-side code
	isValid(value) {
		return this.moment(value, this.parseFormats).isValid();
	},

	// TODO: Move format() so we can share with server-side code
	format(value, format) {
		format = format || this.dateInputFormat + ' ' + this.timeInputFormat;
		return value ? this.moment(value).format(format) : '';
	},

	handleChange(dateValue, timeValue, tzOffsetValue) {
		var value = dateValue + ' ' + timeValue;
		var datetimeFormat = this.dateInputFormat + ' ' + this.timeInputFormat;

		// if the change included a timezone offset, include that in the calculation (so NOW works correctly during DST changes)
		if (typeof tzOffsetValue !== 'undefined') {
			value += ' ' + tzOffsetValue;
			datetimeFormat += ' ' + this.tzOffsetInputFormat;
		}
		// if not, calculate the timezone offset based on the date (respect different DST values)
		else {
				this.setState({ tzOffsetValue: this.moment(value, datetimeFormat).format(this.tzOffsetInputFormat) });
			}

		this.props.onChange({
			path: this.props.path,
			value: this.isValid(value) ? this.moment(value, datetimeFormat).toISOString() : null
		});
	},

	dateChanged({ value }) {
		this.setState({ dateValue: value });
		this.handleChange(value, this.state.timeValue);
	},

	timeChanged(evt) {
		this.setState({ timeValue: evt.target.value });
		this.handleChange(this.state.dateValue, evt.target.value);
	},

	setNow() {
		var dateValue = this.moment().format(this.dateInputFormat);
		var timeValue = this.moment().format(this.timeInputFormat);
		var tzOffsetValue = this.moment().format(this.tzOffsetInputFormat);
		this.setState({
			dateValue: dateValue,
			timeValue: timeValue,
			tzOffsetValue: tzOffsetValue
		});
		this.handleChange(dateValue, timeValue, tzOffsetValue);
	},

	renderNote() {
		if (!this.props.note) return null;
		return _react2.default.createElement(_elemental.FormNote, { note: this.props.note });
	},

	renderUI() {
		var input;
		if (this.shouldRenderField()) {
			input = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.InlineGroup,
					null,
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_DateInput2.default, {
							format: this.dateInputFormat,
							name: this.getInputName(this.props.paths.date),
							onChange: this.dateChanged,
							ref: 'dateInput',
							value: this.state.dateValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_elemental.FormInput, {
							autoComplete: 'off',
							name: this.getInputName(this.props.paths.time),
							onChange: this.timeChanged,
							placeholder: 'HH:MM:SS am/pm',
							value: this.state.timeValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						null,
						_react2.default.createElement(
							_elemental.Button,
							{ onClick: this.setNow },
							'Now'
						)
					)
				),
				_react2.default.createElement('input', {
					name: this.getInputName(this.props.paths.tzOffset),
					type: 'hidden',
					value: this.state.tzOffsetValue
				})
			);
		} else {
			input = _react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true },
				this.format(this.props.value, this.props.formatString)
			);
		}
		return _react2.default.createElement(
			_elemental.FormField,
			{ label: this.props.label, className: 'field-type-datetime', htmlFor: this.getInputName(this.props.path) },
			input,
			this.renderNote()
		);
	}
});