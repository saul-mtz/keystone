'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		street: undefined,
		city: undefined,
		state: undefined,
		code: undefined,
		country: undefined
	};
}

var TextFilter = _react2.default.createClass({
	displayName: 'TextFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			inverted: _react2.default.PropTypes.boolean,
			street: _react2.default.PropTypes.string,
			city: _react2.default.PropTypes.string,
			state: _react2.default.PropTypes.string,
			code: _react2.default.PropTypes.string,
			country: _react2.default.PropTypes.string
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
	updateFilter(key, val) {
		const update = {};
		update[key] = val;
		this.props.onChange(Object.assign(this.props.filter, update));
	},
	toggleInverted(value) {
		this.updateFilter('inverted', value);
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	updateValue(e) {
		this.updateFilter(e.target.name, e.target.value);
	},
	render() {
		const { filter } = this.props;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, {
					equalWidthSegments: true,
					onChange: this.toggleInverted,
					options: INVERTED_OPTIONS,
					value: filter.inverted
				})
			),
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoFocus: true,
					name: 'street',
					onChange: this.updateValue,
					placeholder: 'Address',
					ref: 'focusTarget',
					value: filter.street
				})
			),
			_react2.default.createElement(
				_elemental.Grid.Row,
				{ gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ xsmall: 'two-thirds' },
					_react2.default.createElement(_elemental.FormInput, {
						name: 'city',
						onChange: this.updateValue,
						placeholder: 'City',
						style: { marginBottom: '1em' },
						value: filter.city
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ xsmall: 'one-third' },
					_react2.default.createElement(_elemental.FormInput, {
						name: 'state',
						onChange: this.updateValue,
						placeholder: 'State',
						style: { marginBottom: '1em' },
						value: filter.state
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ xsmall: 'one-third', style: { marginBottom: 0 } },
					_react2.default.createElement(_elemental.FormInput, {
						name: 'code',
						onChange: this.updateValue,
						placeholder: 'Postcode',
						value: filter.code
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ xsmall: 'two-thirds', style: { marginBottom: 0 } },
					_react2.default.createElement(_elemental.FormInput, {
						name: 'country',
						onChange: this.updateValue,
						placeholder: 'Country',
						value: filter.country
					})
				)
			)
		);
	}
});

module.exports = TextFilter;