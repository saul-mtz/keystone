'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Popout = require('../../admin/client/App/shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _elemental = require('../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let lastId = 0;

module.exports = _react2.default.createClass({
	displayName: 'DateInput',
	propTypes: {
		format: _react2.default.PropTypes.string,
		name: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},
	getDefaultProps() {
		return {
			format: 'YYYY-MM-DD'
		};
	},
	getInitialState() {
		const id = ++lastId;
		let month = new Date();
		const { format, value } = this.props;
		if ((0, _moment2.default)(value, format, true).isValid()) {
			month = (0, _moment2.default)(value, format).toDate();
		}
		return {
			id: `_DateInput_${id}`,
			month: month,
			pickerIsOpen: false,
			inputValue: value
		};
	},
	componentDidMount() {
		this.showCurrentMonth();
	},
	componentWillReceiveProps: function (newProps) {
		if (newProps.value === this.props.value) return;
		this.setState({
			month: (0, _moment2.default)(newProps.value, this.props.format).toDate(),
			inputValue: newProps.value
		}, this.showCurrentMonth);
	},
	focus() {
		if (!this.refs.input) return;
		(0, _reactDom.findDOMNode)(this.refs.input).focus();
	},
	handleInputChange(e) {
		const { value } = e.target;
		this.setState({ inputValue: value }, this.showCurrentMonth);
	},
	handleKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// If the date is strictly equal to the format string, dispatch onChange
			if ((0, _moment2.default)(this.state.inputValue, this.props.format, true).isValid()) {
				this.props.onChange({ value: this.state.inputValue });
				// If the date is not strictly equal, only change the tab that is displayed
			} else if ((0, _moment2.default)(this.state.inputValue, this.props.format).isValid()) {
				this.setState({
					month: (0, _moment2.default)(this.state.inputValue, this.props.format).toDate()
				}, this.showCurrentMonth);
			}
		}
	},
	handleDaySelect(e, date, modifiers) {
		if (modifiers && modifiers.disabled) return;

		var value = (0, _moment2.default)(date).format(this.props.format);

		this.props.onChange({ value });
		this.setState({
			pickerIsOpen: false,
			month: date,
			inputValue: value
		});
	},
	showPicker() {
		this.setState({ pickerIsOpen: true }, this.showCurrentMonth);
	},
	showCurrentMonth() {
		if (!this.refs.picker) return;
		this.refs.picker.showMonth(this.state.month);
	},
	handleFocus(e) {
		if (this.state.pickerIsOpen) return;
		this.showPicker();
	},
	handleCancel() {
		this.setState({ pickerIsOpen: false });
	},
	handleBlur(e) {
		let rt = e.relatedTarget || e.nativeEvent.explicitOriginalTarget;
		const popout = this.refs.popout.getPortalDOMNode();
		while (rt) {
			if (rt === popout) return;
			rt = rt.parentNode;
		}
		this.setState({
			pickerIsOpen: false
		});
	},
	render() {
		const selectedDay = this.props.value;
		// react-day-picker adds a class to the selected day based on this
		const modifiers = {
			selected: day => (0, _moment2.default)(day).format(this.props.format) === selectedDay
		};

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_elemental.FormInput, {
				autoComplete: 'off',
				id: this.state.id,
				name: this.props.name,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleFocus,
				onKeyPress: this.handleKeyPress,
				placeholder: this.props.format,
				ref: 'input',
				value: this.state.inputValue
			}),
			_react2.default.createElement(
				_Popout2.default,
				{
					isOpen: this.state.pickerIsOpen,
					onCancel: this.handleCancel,
					ref: 'popout',
					relativeToID: this.state.id,
					width: 260
				},
				_react2.default.createElement(_reactDayPicker2.default, {
					modifiers: modifiers,
					onDayClick: this.handleDaySelect,
					ref: 'picker',
					tabIndex: -1
				})
			)
		);
	}
});