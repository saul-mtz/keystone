'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODE_OPTIONS = [{ label: 'Exactly', value: 'equals' }, { label: 'Greater Than', value: 'gt' }, { label: 'Less Than', value: 'lt' }, { label: 'Between', value: 'between' }];

const PRESENCE_OPTIONS = [{ label: 'At least one element', value: 'some' }, { label: 'No element', value: 'none' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		presence: PRESENCE_OPTIONS[0].value,
		value: ''
	};
}

var NumberArrayFilter = _react2.default.createClass({
	displayName: 'NumberArrayFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(i => i.value)),
			presence: _react2.default.PropTypes.oneOf(PRESENCE_OPTIONS.map(i => i.value)),
			value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.shape({
				min: _react2.default.PropTypes.number,
				max: _react2.default.PropTypes.number
			})])
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	// Returns a function that handles a specific type of onChange events for
	// either 'minValue', 'maxValue' or simply 'value'
	handleValueChangeBuilder(type) {
		var self = this;
		return function (e) {
			switch (type) {
				case 'minValue':
					self.updateFilter({
						value: {
							min: e.target.value,
							max: self.props.filter.value.max
						}
					});
					break;
				case 'maxValue':
					self.updateFilter({
						value: {
							min: self.props.filter.value.min,
							max: e.target.value
						}
					});
					break;
				case 'value':
					self.updateFilter({
						value: e.target.value
					});
					break;
			}
		};
	},
	// Update the props with this.props.onChange
	updateFilter(changedProp) {
		this.props.onChange(_extends({}, this.props.filter, changedProp));
	},
	// Update the filter mode
	selectMode(e) {
		const mode = e.target.value;
		this.updateFilter({ mode });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	// Update the presence selection
	selectPresence(e) {
		const presence = e.target.value;
		this.updateFilter({ presence });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	// Render the controls, showing two inputs when the mode is "between"
	renderControls(presence, mode) {
		let controls;
		const placeholder = presence.label + ' is ' + mode.label.toLowerCase() + '...';

		if (mode.value === 'between') {
			// Render "min" and "max" input
			controls = _react2.default.createElement(
				_elemental.Grid.Row,
				{ xsmall: 'one-half', gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.handleValueChangeBuilder('minValue'),
						placeholder: 'Min.',
						ref: 'focusTarget',
						type: 'number',
						value: this.props.filter.value.min
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.handleValueChangeBuilder('maxValue'),
						placeholder: 'Max.',
						type: 'number',
						value: this.props.filter.value.max
					})
				)
			);
		} else {
			// Render one number input
			controls = _react2.default.createElement(_elemental.FormInput, {
				onChange: this.handleValueChangeBuilder('value'),
				placeholder: placeholder,
				ref: 'focusTarget',
				type: 'number',
				value: this.props.filter.value
			});
		}

		return controls;
	},
	render() {
		const { filter } = this.props;
		// Get mode and presence based on their values with .filter
		const mode = MODE_OPTIONS.filter(i => i.value === filter.mode)[0];
		const presence = PRESENCE_OPTIONS.filter(i => i.value === filter.presence)[0];

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectPresence,
					options: PRESENCE_OPTIONS,
					value: presence.value
				})
			),
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectMode,
					options: MODE_OPTIONS,
					value: mode.value
				})
			),
			this.renderControls(presence, mode)
		);
	}

});

module.exports = NumberArrayFilter;