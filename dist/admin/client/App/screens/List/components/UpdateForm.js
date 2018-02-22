'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDom = require('react-dom');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _FieldTypes = require('FieldTypes');

var _InvalidFieldType = require('../../../shared/InvalidFieldType');

var _InvalidFieldType2 = _interopRequireDefault(_InvalidFieldType);

var _string = require('../../../../utils/string');

var _elemental = require('../../../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateForm = _react2.default.createClass({
	displayName: 'UpdateForm',
	propTypes: {
		isOpen: _react2.default.PropTypes.bool,
		itemIds: _react2.default.PropTypes.array,
		list: _react2.default.PropTypes.object,
		onCancel: _react2.default.PropTypes.func
	},
	getDefaultProps() {
		return {
			isOpen: false
		};
	},
	getInitialState() {
		return {
			fields: []
		};
	},
	componentDidMount() {
		this.doFocus();
	},
	componentDidUpdate() {
		this.doFocus();
	},
	doFocus() {
		if (this.refs.focusTarget) {
			(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
		}
	},
	getOptions() {
		const { fields } = this.props.list;
		return Object.keys(fields).map(key => ({ value: fields[key].path, label: fields[key].label }));
	},
	getFieldProps(field) {
		var props = (0, _objectAssign2.default)({}, field);
		props.value = this.state.fields[field.path];
		props.values = this.state.fields;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},
	updateOptions(fields) {
		this.setState({
			fields: fields
		}, this.doFocus);
	},
	handleChange(value) {
		console.log('handleChange:', value);
	},
	handleClose() {
		this.setState({
			fields: []
		});
		this.props.onCancel();
	},

	renderFields() {
		const { list } = this.props;
		const { fields } = this.state;
		const formFields = [];
		let focusRef;

		fields.forEach(fieldOption => {
			const field = list.fields[fieldOption.value];

			if (typeof _FieldTypes.Fields[field.type] !== 'function') {
				formFields.push(_react2.default.createElement(_InvalidFieldType2.default, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			var fieldProps = this.getFieldProps(field);
			if (!focusRef) {
				fieldProps.ref = focusRef = 'focusTarget';
			}
			formFields.push(_react2.default.createElement(_FieldTypes.Fields[field.type], fieldProps));
		});

		const fieldsUI = formFields.length ? formFields : _react2.default.createElement(_elemental.BlankState, {
			heading: 'Choose a field above to begin',
			style: { padding: '3em 2em' }
		});

		return _react2.default.createElement(
			'div',
			{ style: { borderTop: '1px dashed rgba(0,0,0,0.1)', marginTop: 20, paddingTop: 20 } },
			fieldsUI
		);
	},
	renderForm() {
		const { itemIds, list } = this.props;
		const itemCount = (0, _string.plural)(itemIds, '* ' + list.singular, '* ' + list.plural);
		const formAction = `${Keystone.adminPath}/${list.path}`;

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal', action: formAction, noValidate: 'true' },
			_react2.default.createElement(_elemental.Modal.Header, {
				onClose: this.handleClose,
				showCloseButton: true,
				text: 'Update ' + itemCount
			}),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(_reactSelect2.default, {
					key: 'field-select',
					multi: true,
					onChange: this.updateOptions,
					options: this.getOptions(),
					ref: 'initialFocusTarget',
					value: this.state.fields
				}),
				this.renderFields()
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ color: 'primary', submit: true },
					'Update'
				),
				_react2.default.createElement(
					_elemental.Button,
					{ color: 'cancel', variant: 'link', onClick: this.handleClose },
					'Cancel'
				)
			)
		);
	},
	render() {
		return _react2.default.createElement(
			_elemental.Modal.Dialog,
			{ isOpen: this.props.isOpen, onClose: this.handleClose, backdropClosesModal: true },
			this.renderForm()
		);
	}
});

module.exports = UpdateForm;