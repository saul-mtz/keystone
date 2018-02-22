'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var Button = require('elemental').Button;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;

var lastId = 0;
var ENTER_KEYCODE = 13;

function newItem(value) {
	lastId = lastId + 1;
	return { key: 'i' + lastId, value: value };
}

function reduceValues(values) {
	return values.map(i => i.value);
}

module.exports = {
	getInitialState: function () {
		return {
			values: Array.isArray(this.props.value) ? this.props.value.map(newItem) : []
		};
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.value.join('|') !== reduceValues(this.state.values).join('|')) {
			this.setState({
				values: nextProps.value.map(newItem)
			});
		}
	},

	addItem: function () {
		var newValues = this.state.values.concat(newItem(''));
		this.setState({
			values: newValues
		}, () => {
			if (!this.state.values.length) return;
			(0, _reactDom.findDOMNode)(this.refs['item_' + this.state.values.length]).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	removeItem: function (i) {
		var newValues = _lodash2.default.without(this.state.values, i);
		this.setState({
			values: newValues
		}, function () {
			(0, _reactDom.findDOMNode)(this.refs.button).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	updateItem: function (i, event) {
		var updatedValues = this.state.values;
		var updateIndex = updatedValues.indexOf(i);
		var newValue = event.value || event.target.value;
		updatedValues[updateIndex].value = this.cleanInput ? this.cleanInput(newValue) : newValue;
		this.setState({
			values: updatedValues
		});
		this.valueChanged(reduceValues(updatedValues));
	},

	valueChanged: function (values) {
		this.props.onChange({
			path: this.props.path,
			value: values
		});
	},

	renderField: function () {
		return React.createElement(
			'div',
			null,
			this.state.values.map(this.renderItem),
			React.createElement(
				Button,
				{ ref: 'button', onClick: this.addItem },
				'Add item'
			)
		);
	},

	renderItem: function (item, index) {
		const Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		const value = this.processInputValue ? this.processInputValue(item.value) : item.value;
		return React.createElement(
			FormField,
			{ key: item.key },
			React.createElement(Input, { ref: 'item_' + (index + 1), name: this.getInputName(this.props.path), value: value, onChange: this.updateItem.bind(this, item), onKeyDown: this.addItemOnEnter, autoComplete: 'off' }),
			React.createElement(
				Button,
				{ type: 'link-cancel', onClick: this.removeItem.bind(this, item), className: 'keystone-relational-button' },
				React.createElement('span', { className: 'octicon octicon-x' })
			)
		);
	},

	renderValue: function () {
		const Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		return React.createElement(
			'div',
			null,
			this.state.values.map((item, i) => {
				const value = this.formatValue ? this.formatValue(item.value) : item.value;
				return React.createElement(
					'div',
					{ key: i, style: i ? { marginTop: '1em' } : null },
					React.createElement(Input, { noedit: true, value: value })
				);
			})
		);
	},

	// Override shouldCollapse to check for array length
	shouldCollapse: function () {
		return this.props.collapse && !this.props.value.length;
	},

	addItemOnEnter: function (event) {
		if (event.keyCode === ENTER_KEYCODE) {
			this.addItem();
			event.preventDefault();
		}
	}
};