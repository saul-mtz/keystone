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

const INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

const MODE_OPTIONS = [{ label: 'On', value: 'on' }, { label: 'After', value: 'after' }, { label: 'Before', value: 'before' }, { label: 'Between', value: 'between' }];

const DayPickerIndicator = ({ activeInputField }) => {
	const style = activeInputField === 'before' ? { left: '11rem' } : null;

	return _react2.default.createElement(
		'span',
		{ className: 'DayPicker-Indicator', style: style },
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__border' }),
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__bg' })
	);
};

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		inverted: INVERTED_OPTIONS[0].value,
		value: (0, _moment2.default)(0, 'HH').format(),
		before: (0, _moment2.default)(0, 'HH').format(),
		after: (0, _moment2.default)(0, 'HH').format()
	};
}

var DateFilter = _react2.default.createClass({
	displayName: 'DateFilter',
	propTypes: {
		filter: _react.PropTypes.shape({
			mode: _react.PropTypes.oneOf(MODE_OPTIONS.map(i => i.value)),
			inverted: _react.PropTypes.boolean
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
		this.__isMounted = true;
	},
	componentWillUnmount() {
		this.__isMounted = false;
	},

	// ==============================
	// METHODS
	// ==============================

	updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	toggleInverted(value) {
		this.updateFilter({ inverted: value });
		this.setFocus(this.props.filter.mode);
	},
	selectMode(e) {
		const mode = e.target.value;
		this.updateFilter({ mode });
		this.setFocus(mode);
	},
	setFocus(mode) {
		// give the UI a moment to render
		if (mode === 'between') {
			setTimeout(() => {
				(0, _reactDom.findDOMNode)(this.refs[this.state.activeInputField]).focus();
			}, 50);
		} else {
			setTimeout(() => {
				this.refs.input.focus();
			}, 50);
		}
	},
	handleInputChange(e) {
		// TODO @jedwatson
		// Entering virtually any value will return an "Invalid date", so I'm
		// temporarily disabling user entry. This entire component needs review.

		// const { value } = e.target;
		// let { month } = this.state;
		// // Change the current month only if the value entered by the user is a valid
		// // date, according to the `L` format
		// if (moment(value, 'L', true).isValid()) {
		// 	month = moment(value, 'L').toDate();
		// }
		// this.updateFilter({ value: value });
		// this.setState({ month }, this.showCurrentDate);
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
		const newActiveField = activeInputField === 'before' ? 'after' : 'before';
		send[activeInputField] = day;
		this.updateFilter(send);
		this.setState({ activeInputField: newActiveField }, () => {
			(0, _reactDom.findDOMNode)(this.refs[newActiveField]).focus();
		});
	},
	selectDay(e, day, modifiers) {
		if (modifiers && modifiers.disabled) return;
		this.updateFilter({ value: day });
	},
	showCurrentDate() {
		// give the UI a moment to render
		setTimeout(() => {
			this.refs.daypicker.showMonth(this.state.month);
		}, 50);
	},

	// ==============================
	// RENDERERS
	// ==============================

	renderToggle() {
		const { filter } = this.props;
		return _react2.default.createElement(
			'div',
			{ style: { marginBottom: '1em' } },
			_react2.default.createElement(_elemental.SegmentedControl, {
				equalWidthSegments: true,
				onChange: this.toggleInverted,
				options: INVERTED_OPTIONS,
				value: filter.inverted
			})
		);
	},
	renderControls() {
		let controls;
		const { activeInputField } = this.state;
		const { field, filter } = this.props;
		const mode = MODE_OPTIONS.filter(i => i.value === filter.mode)[0];
		const placeholder = field.label + ' is ' + mode.label.toLowerCase() + '...';

		// DayPicker Modifiers - Selected Day
		let modifiers = filter.mode === 'between' ? {
			selected: day => (0, _moment2.default)(filter[activeInputField]).isSame(day)
		} : {
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
							_react2.default.createElement(_elemental.FormInput, {
								autoFocus: true,
								ref: 'after',
								placeholder: 'From',
								onChange: this.handleInputChange,
								onFocus: () => this.setActiveField('after'),
								value: (0, _moment2.default)(filter.after).format(this.props.format)
							})
						),
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, {
								ref: 'before',
								placeholder: 'To',
								onChange: this.handleInputChange,
								onFocus: () => this.setActiveField('before'),
								value: (0, _moment2.default)(filter.before).format(this.props.format)
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.switchBetweenActiveInputFields
					}),
					_react2.default.createElement(DayPickerIndicator, { activeInputField: activeInputField })
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
						autoFocus: true,
						ref: 'input',
						placeholder: placeholder,
						value: (0, _moment2.default)(filter.value).format(this.props.format),
						onChange: this.handleInputChange,
						onFocus: this.showCurrentDate
					})
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						ref: 'daypicker',
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.selectDay
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
		return _react2.default.createElement(
			'div',
			null,
			this.renderToggle(),
			_react2.default.createElement(
				'div',
				{ style: { marginBottom: '1em' } },
				_react2.default.createElement(_elemental.FormSelect, {
					options: MODE_OPTIONS,
					onChange: this.selectMode,
					value: mode.value
				})
			),
			this.renderControls()
		);
	}
});

module.exports = DateFilter;