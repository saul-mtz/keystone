'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODE_OPTIONS = [{ label: 'Contains', value: 'contains' }, { label: 'Exactly', value: 'exactly' }, { label: 'Begins with', value: 'beginsWith' }, { label: 'Ends with', value: 'endsWith' }];

const PRESENCE_OPTIONS = [{ label: 'At least one element', value: 'some' }, { label: 'No element', value: 'none' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		presence: PRESENCE_OPTIONS[0].value,
		value: ''
	};
}

var TextArrayFilter = _react2.default.createClass({
	displayName: 'TextArrayFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(i => i.value)),
			presence: _react2.default.PropTypes.oneOf(PRESENCE_OPTIONS.map(i => i.value)),
			value: _react2.default.PropTypes.string
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
	updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	selectMode(e) {
		const mode = e.target.value;
		this.updateFilter({ mode });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	selectPresence(e) {
		const presence = e.target.value;
		this.updateFilter({ presence });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	updateValue(e) {
		this.updateFilter({ value: e.target.value });
	},
	render() {
		const { filter } = this.props;
		const mode = MODE_OPTIONS.filter(i => i.value === filter.mode)[0];
		const presence = PRESENCE_OPTIONS.filter(i => i.value === filter.presence)[0];
		const beingVerb = mode.value === 'exactly' ? ' is ' : ' ';
		const placeholder = presence.label + beingVerb + mode.label.toLowerCase() + '...';

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
			_react2.default.createElement(_elemental.FormInput, {
				autoFocus: true,
				onChange: this.updateValue,
				placeholder: placeholder,
				ref: 'focusTarget',
				value: this.props.filter.value
			})
		);
	}
});

module.exports = TextArrayFilter;