'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _AlertMessages = require('./AlertMessages');

var _AlertMessages2 = _interopRequireDefault(_AlertMessages);

var _FieldTypes = require('FieldTypes');

var _InvalidFieldType = require('./InvalidFieldType');

var _InvalidFieldType2 = _interopRequireDefault(_InvalidFieldType);

var _elemental = require('../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreateForm = _react2.default.createClass({
	displayName: 'CreateForm',
	propTypes: {
		err: _react2.default.PropTypes.object,
		isOpen: _react2.default.PropTypes.bool,
		list: _react2.default.PropTypes.object,
		onCancel: _react2.default.PropTypes.func,
		onCreate: _react2.default.PropTypes.func
	},
	getDefaultProps() {
		return {
			err: null,
			isOpen: false
		};
	},
	getInitialState() {
		// Set the field values to their default values when first rendering the
		// form. (If they have a default value, that is)
		var values = {};
		Object.keys(this.props.list.fields).forEach(key => {
			var field = this.props.list.fields[key];
			var FieldComponent = _FieldTypes.Fields[field.type];
			values[field.path] = FieldComponent.getDefaultValue(field);
		});
		return {
			values: values,
			alerts: {}
		};
	},
	componentDidMount() {
		document.body.addEventListener('keyup', this.handleKeyPress, false);
	},
	componentWillUnmount() {
		document.body.removeEventListener('keyup', this.handleKeyPress, false);
	},
	handleKeyPress(evt) {
		if (_vkey2.default[evt.keyCode] === '<escape>') {
			this.props.onCancel();
		}
	},
	// Handle input change events
	handleChange(event) {
		var values = (0, _objectAssign2.default)({}, this.state.values);
		values[event.path] = event.value;
		this.setState({
			values: values
		});
	},
	// Set the props of a field
	getFieldProps(field) {
		var props = (0, _objectAssign2.default)({}, field);
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},
	// Create a new item when the form is submitted
	submitForm(event) {
		event.preventDefault();
		const createForm = event.target;
		const formData = new FormData(createForm);
		this.props.list.createItem(formData, (err, data) => {
			if (data) {
				if (this.props.onCreate) {
					this.props.onCreate(data);
				} else {
					// Clear form
					this.setState({
						values: {},
						alerts: {
							success: {
								success: 'Item created'
							}
						}
					});
				}
			} else {
				if (!err) {
					err = {
						error: 'connection error'
					};
				}
				// If we get a database error, show the database error message
				// instead of only saying "Database error"
				if (err.error === 'database error') {
					err.error = err.detail.errmsg;
				}
				this.setState({
					alerts: {
						error: err
					}
				});
			}
		});
	},
	// Render the form itself
	renderForm() {
		if (!this.props.isOpen) return;

		var form = [];
		var list = this.props.list;
		var nameField = this.props.list.nameField;
		var focusWasSet;

		// If the name field is an initial one, we need to render a proper
		// input for it
		if (list.nameIsInitial) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.autoFocus = focusWasSet = true;

			if (nameField.type === 'text') {
				nameFieldProps.className = 'item-name-field';
				nameFieldProps.placeholder = nameField.label;
				nameFieldProps.label = '';
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[nameField.type], nameFieldProps));
		}

		// Render inputs for all initial fields
		Object.keys(list.initialFields).forEach(key => {
			var field = list.fields[list.initialFields[key]];
			// If there's something weird passed in as field type, render the
			// invalid field type component
			if (typeof _FieldTypes.Fields[field.type] !== 'function') {
				form.push(_react2.default.createElement(_InvalidFieldType2.default, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			// Get the props for the input field
			var fieldProps = this.getFieldProps(field);
			// If there was no focusRef set previously, set the current field to
			// be the one to be focussed. Generally the first input field, if
			// there's an initial name field that takes precedence.
			if (!focusWasSet) {
				fieldProps.autoFocus = focusWasSet = true;
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[field.type], fieldProps));
		});

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal', onSubmit: this.submitForm },
			_react2.default.createElement(_elemental.Modal.Header, {
				text: 'Create a new ' + list.singular,
				showCloseButton: true
			}),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(_AlertMessages2.default, { alerts: this.state.alerts }),
				form
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ color: 'success', type: 'submit', 'data-button-type': 'submit' },
					'Create'
				),
				_react2.default.createElement(
					_elemental.Button,
					{
						variant: 'link',
						color: 'cancel',
						'data-button-type': 'cancel',
						onClick: this.props.onCancel
					},
					'Cancel'
				)
			)
		);
	},
	render() {
		return _react2.default.createElement(
			_elemental.Modal.Dialog,
			{
				isOpen: this.props.isOpen,
				onClose: this.props.onCancel,
				backdropClosesModal: true
			},
			this.renderForm()
		);
	}
}); /**
     * The form that's visible when "Create <ItemName>" is clicked on either the
     * List screen or the Item screen
     */

module.exports = CreateForm;