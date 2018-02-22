'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PRESENCE_OPTIONS = [{ label: 'At least one element', value: 'some' }, { label: 'No element', value: 'none' }];

const MODE_OPTIONS = [{ label: 'On', value: 'on' }, { label: 'After', value: 'after' }, { label: 'Before', value: 'before' }, { label: 'Between', value: 'between' }];

var DayPickerIndicator = _react2.default.createClass({
	displayName: 'DayPickerIndicator',

	render() {
		return _react2.default.createElement(
			'span',
			{ className: 'DayPicker-Indicator' },
			_react2.default.createElement('span', { className: 'DayPicker-Indicator__border' }),
			_react2.default.createElement('span', { className: 'DayPicker-Indicator__bg' })
		);
	}
});

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		presence: PRESENCE_OPTIONS[0].value,
		value: (0, _moment2.default)(0, 'HH').format(),
		before: (0, _moment2.default)(0, 'HH').format(),
		after: (0, _moment2.default)(0, 'HH').format()
	};
}

var DateFilter = _react2.default.createClass({
	displayName: 'DateFilter',
	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(i => i.value)),
			presence: _react2.default.PropTypes.string
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps() {
		return {
			format: 'DD-MM-YYYY',
			filter: getDefaultValue(),
			value: (0, _moment2.default)().startOf('day').toDate()
		};
	},
	getInitialState() {
		return {
			activeInputField: 'after',
			month: new Date() };
	},
	componentDidMount() {
		// focus the text input
		if (this.props.filter.mode === 'between') {
			(0, _reactDom.findDOMNode)(this.refs[this.state.activeInputField]).focus();
		} else {
			(0, _reactDom.findDOMNode)(this.refs.input).focus();
		}
	},
	updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	selectPresence(e) {
		const presence = e.target.value;
		this.updateFilter({ presence });
		(0, _reactDom.findDOMNode)(this.refs.input).focus();
	},
	selectMode(e) {
		const mode = e.target.value;
		this.updateFilter({ mode });
		if (mode === 'between') {
			setTimeout(() => {
				(0, _reactDom.findDOMNode)(this.refs[this.state.activeInputField]).focus();
			}, 200);
		} else {
			(0, _reactDom.findDOMNode)(this.refs.input).focus();
		}
	},
	handleInputChange(e) {
		const { value } = e.target;
		let { month } = this.state;
		// Change the current month only if the value entered by the user is a valid
		// date, according to the `L` format
		if ((0, _moment2.default)(value, 'L', true).isValid()) {
			month = (0, _moment2.default)(value, 'L').toDate();
		}
		this.updateFilter({ value: value });
		this.setState({ month }, this.showCurrentDate);
	},
	setActiveField(field) {
		this.setState({
			activeInputField: field
		});
	},
	switchBetweenActiveInputFields(e, day, modifiers) {
		if (modifiers && modifiers.disabled) return;
		const { activeInputField } = this.state;
		const send = {};
		send[activeInputField] = day;
		this.updateFilter(send);
		const newActiveField = activeInputField === 'before' ? 'after' : 'before';
		this.setState({ activeInputField: newActiveField }, () => {
			(0, _reactDom.findDOMNode)(this.refs[newActiveField]).focus();
		});
	},
	selectDay(e, day, modifiers) {
		if (modifiers && modifiers.disabled) return;
		this.updateFilter({ value: day });
	},
	showCurrentDate() {
		this.refs.daypicker.showMonth(this.state.month);
	},
	renderControls() {
		let controls;
		const { field, filter } = this.props;
		const mode = MODE_OPTIONS.filter(i => i.value === filter.mode)[0];
		const placeholder = field.label + ' is ' + mode.label.toLowerCase() + '...';

		// DayPicker stuff
		const modifiers = {
			selected: day => (0, _moment2.default)(filter.value).isSame(day)
		};

		if (mode.value === 'between') {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(
						_elemental.Grid.Row,
						{ xsmall: 'one-half', gutter: 10 },
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, { ref: 'after', placeholder: 'From', onFocus: e => {
									this.setActiveField('after');
								}, value: (0, _moment2.default)(filter.after).format(this.props.format) })
						),
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, { ref: 'before', placeholder: 'To', onFocus: e => {
									this.setActiveField('before');
								}, value: (0, _moment2.default)(filter.before).format(this.props.format) })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						className: 'DayPicker--chrome',
						modifiers: modifiers,
						onDayClick: this.switchBetweenActiveInputFields
					}),
					_react2.default.createElement(DayPickerIndicator, null)
				)
			);
		} else {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.handleInputChange,
						onFocus: this.showCurrentDate,
						placeholder: placeholder,
						ref: 'input',
						value: (0, _moment2.default)(filter.value).format(this.props.format)
					})
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						className: 'DayPicker--chrome',
						modifiers: modifiers,
						onDayClick: this.selectDay,
						ref: 'daypicker'
					}),
					_react2.default.createElement(DayPickerIndicator, null)
				)
			);
		}

		return controls;
	},
	render() {
		const { filter } = this.props;
		const mode = MODE_OPTIONS.filter(i => i.value === filter.mode)[0];
		const presence = PRESENCE_OPTIONS.filter(i => i.value === filter.presence)[0];

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'div',
				{ style: { marginBottom: '1em' } },
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectPresence,
					options: PRESENCE_OPTIONS,
					value: presence.value
				})
			),
			_react2.default.createElement(
				'div',
				{ style: { marginBottom: '1em' } },
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectMode,
					options: MODE_OPTIONS,
					value: mode.value
				})
			),
			this.renderControls()
		);
	}
});

module.exports = DateFilter;