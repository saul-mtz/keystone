'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _elemental = require('../../../elemental');

var _FieldTypes = require('FieldTypes');

var _color = require('../../../../utils/color');

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _AlertMessages = require('../../../shared/AlertMessages');

var _AlertMessages2 = _interopRequireDefault(_AlertMessages);

var _ConfirmationDialog = require('./../../../shared/ConfirmationDialog');

var _ConfirmationDialog2 = _interopRequireDefault(_ConfirmationDialog);

var _FormHeading = require('./FormHeading');

var _FormHeading2 = _interopRequireDefault(_FormHeading);

var _AltText = require('./AltText');

var _AltText2 = _interopRequireDefault(_AltText);

var _FooterBar = require('./FooterBar');

var _FooterBar2 = _interopRequireDefault(_FooterBar);

var _InvalidFieldType = require('../../../shared/InvalidFieldType');

var _InvalidFieldType2 = _interopRequireDefault(_InvalidFieldType);

var _actions = require('../actions');

var _string = require('../../../../utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { css, StyleSheet } from 'aphrodite/no-important';
function getNameFromData(data) {
	if (typeof data === 'object') {
		if (typeof data.first === 'string' && typeof data.last === 'string') {
			return data.first + ' ' + data.last;
		} else if (data.id) {
			return data.id;
		}
	}
	return data;
}

function smoothScrollTop() {
	if (document.body.scrollTop || document.documentElement.scrollTop) {
		window.scrollBy(0, -50);
		var timeOut = setTimeout(smoothScrollTop, 20);
	} else {
		clearTimeout(timeOut);
	}
}

var EditForm = _react2.default.createClass({
	displayName: 'EditForm',
	propTypes: {
		data: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object
	},
	getInitialState() {
		return {
			values: (0, _objectAssign2.default)({}, this.props.data.fields),
			confirmationDialog: null,
			loading: false,
			lastValues: null, // used for resetting
			focusFirstField: !this.props.list.nameField && !this.props.list.nameFieldIsFormHeader
		};
	},
	componentDidMount() {
		this.__isMounted = true;
	},
	componentWillUnmount() {
		this.__isMounted = false;
	},
	getFieldProps(field) {
		const props = (0, _objectAssign2.default)({}, field);
		const alerts = this.state.alerts;
		// Display validation errors inline
		if (alerts && alerts.error && alerts.error.error === 'validation errors') {
			if (alerts.error.detail[field.path]) {
				// NOTE: This won't work yet, as ElementalUI doesn't allow
				// passed in isValid, only invalidates via internal state.
				// PR to fix that: https://github.com/elementalui/elemental/pull/149
				props.isValid = false;
			}
		}
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'edit';
		return props;
	},
	handleChange(event) {
		const values = (0, _objectAssign2.default)({}, this.state.values);

		values[event.path] = event.value;
		this.setState({ values });
	},

	toggleDeleteDialog() {
		this.setState({
			deleteDialogIsOpen: !this.state.deleteDialogIsOpen
		});
	},
	toggleResetDialog() {
		this.setState({
			resetDialogIsOpen: !this.state.resetDialogIsOpen
		});
	},
	handleReset() {
		this.reset = true;
		this.setState({
			values: (0, _objectAssign2.default)({}, this.state.lastValues || this.props.data.fields),
			resetDialogIsOpen: false
		});
	},
	handleDelete() {
		const { data } = this.props;
		this.props.dispatch((0, _actions.deleteItem)(data.id, this.props.router));
	},
	handleKeyFocus() {
		const input = this.refs.keyOrIdInput;
		input.select();
	},
	removeConfirmationDialog() {
		this.setState({
			confirmationDialog: null
		});
	},
	updateItem() {
		const { data, list } = this.props;
		const editForm = this.refs.editForm;
		const formData = new FormData(editForm);

		// Show loading indicator
		this.setState({
			loading: true
		});

		list.updateItem(data.id, formData, (err, data) => {
			smoothScrollTop();
			if (err) {
				this.setState({
					alerts: {
						error: err
					},
					loading: false
				});
			} else {
				this.edited = true;

				// Success, display success flash messages, replace values
				// TODO: Update key value
				this.setState({
					alerts: {
						success: {
							success: 'Your changes have been saved successfully'
						}
					},
					lastValues: this.state.values,
					values: data.fields,
					loading: false
				});
			}
		});
	},
	renderKeyOrId() {
		var className = 'EditForm__key-or-id';
		var list = this.props.list;

		if (list.nameField && list.autokey && this.props.data[list.autokey.path]) {
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(_AltText2.default, {
					modified: 'ID:',
					normal: `${(0, _string.upcase)(list.autokey.path)}: `,
					title: 'Press <alt> to reveal the ID',
					className: 'EditForm__key-or-id__label' }),
				_react2.default.createElement(_AltText2.default, {
					modified: _react2.default.createElement('input', { ref: 'keyOrIdInput', onFocus: this.handleKeyFocus, value: this.props.data.id, className: 'EditForm__key-or-id__input', readOnly: true }),
					normal: _react2.default.createElement('input', { ref: 'keyOrIdInput', onFocus: this.handleKeyFocus, value: this.props.data[list.autokey.path], className: 'EditForm__key-or-id__input', readOnly: true }),
					title: 'Press <alt> to reveal the ID',
					className: 'EditForm__key-or-id__field' })
			);
		} else if (list.autokey && this.props.data[list.autokey.path]) {
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'span',
					{ className: 'EditForm__key-or-id__label' },
					list.autokey.path,
					': '
				),
				_react2.default.createElement(
					'div',
					{ className: 'EditForm__key-or-id__field' },
					_react2.default.createElement('input', { ref: 'keyOrIdInput', onFocus: this.handleKeyFocus, value: this.props.data[list.autokey.path], className: 'EditForm__key-or-id__input', readOnly: true })
				)
			);
		} else if (list.nameField) {
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'span',
					{ className: 'EditForm__key-or-id__label' },
					'ID: '
				),
				_react2.default.createElement(
					'div',
					{ className: 'EditForm__key-or-id__field' },
					_react2.default.createElement('input', { ref: 'keyOrIdInput', onFocus: this.handleKeyFocus, value: this.props.data.id, className: 'EditForm__key-or-id__input', readOnly: true })
				)
			);
		}
	},
	renderNameField() {
		var nameField = this.props.list.nameField;
		var nameFieldIsFormHeader = this.props.list.nameFieldIsFormHeader;
		var wrapNameField = field => _react2.default.createElement(
			'div',
			{ className: 'EditForm__name-field' },
			field
		);
		if (nameFieldIsFormHeader) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.label = null;
			nameFieldProps.size = 'full';
			nameFieldProps.autoFocus = true;
			nameFieldProps.inputProps = {
				className: 'item-name-field',
				placeholder: nameField.label,
				size: 'large'
			};
			return wrapNameField(_react2.default.createElement(_FieldTypes.Fields[nameField.type], nameFieldProps));
		} else {
			return wrapNameField(_react2.default.createElement(
				'h2',
				null,
				this.props.data.name || '(no name)'
			));
		}
	},
	renderFormElements() {
		var headings = 0;
		let edited = false;
		let reset = false;

		if (this.edited) {
			edited = true;
			this.edited = false;
		} else if (this.reset) {
			reset = true;
			this.reset = false;
		}

		return this.props.list.uiElements.map((el, index) => {
			// Don't render the name field if it is the header since it'll be rendered in BIG above
			// the list. (see renderNameField method, this is the reverse check of the one it does)
			if (this.props.list.nameField && el.field === this.props.list.nameField.path && this.props.list.nameFieldIsFormHeader) return;

			if (el.type === 'heading') {
				headings++;
				el.options.values = this.state.values;
				el.key = 'h-' + headings;
				return _react2.default.createElement(_FormHeading2.default, el);
			}

			if (el.type === 'field') {
				var field = this.props.list.fields[el.field];
				var props = this.getFieldProps(field);
				if (typeof _FieldTypes.Fields[field.type] !== 'function') {
					return _react2.default.createElement(_InvalidFieldType2.default, { type: field.type, path: field.path, key: field.path });
				}
				props.key = field.path;
				if (index === 0 && this.state.focusFirstField) {
					props.autoFocus = true;
				}

				// to know if the list was edited
				props.edited = edited;
				props.reset = reset;

				return _react2.default.createElement(_FieldTypes.Fields[field.type], props);
			}
		}, this);
	},
	renderFooterBar() {
		if (this.props.list.noedit && this.props.list.nodelete) {
			return null;
		}

		const { loading } = this.state;
		const loadingButtonText = loading ? 'Saving' : 'Save';

		// Padding must be applied inline so the FooterBar can determine its
		// innerHeight at runtime. Aphrodite's styling comes later...

		return _react2.default.createElement(
			_FooterBar2.default,
			{ style: styles.footerbar },
			_react2.default.createElement(
				'div',
				{ style: styles.footerbarInner },
				!this.props.list.noedit && _react2.default.createElement(
					_elemental.LoadingButton,
					{
						color: 'primary',
						disabled: loading,
						loading: loading,
						onClick: this.updateItem,
						'data-button': 'update'
					},
					loadingButtonText
				),
				!this.props.list.noedit && _react2.default.createElement(
					_elemental.Button,
					{ disabled: loading, onClick: this.toggleResetDialog, variant: 'link', color: 'cancel', 'data-button': 'reset' },
					_react2.default.createElement(_elemental.ResponsiveText, {
						hiddenXS: 'reset changes',
						visibleXS: 'reset'
					})
				),
				!this.props.list.nodelete && _react2.default.createElement(
					_elemental.Button,
					{ disabled: loading, onClick: this.toggleDeleteDialog, variant: 'link', color: 'delete', style: styles.deleteButton, 'data-button': 'delete' },
					_react2.default.createElement(_elemental.ResponsiveText, {
						hiddenXS: `delete ${this.props.list.singular.toLowerCase()}`,
						visibleXS: 'delete'
					})
				)
			)
		);
	},
	renderTrackingMeta() {
		// TODO: These fields are visible now, so we don't want this. We may revisit
		// it when we have more granular control over hiding fields in certain
		// contexts, so I'm leaving this code here as a reference for now - JW
		if (true) return null; // if (true) prevents unreachable code linter errpr

		if (!this.props.list.tracking) return null;

		var elements = [];
		var data = {};

		if (this.props.list.tracking.createdAt) {
			data.createdAt = this.props.data.fields[this.props.list.tracking.createdAt];
			if (data.createdAt) {
				elements.push(_react2.default.createElement(
					_elemental.FormField,
					{ key: 'createdAt', label: 'Created on' },
					_react2.default.createElement(
						_elemental.FormInput,
						{ noedit: true, title: (0, _moment2.default)(data.createdAt).format('DD/MM/YYYY h:mm:ssa') },
						(0, _moment2.default)(data.createdAt).format('Do MMM YYYY')
					)
				));
			}
		}

		if (this.props.list.tracking.createdBy) {
			data.createdBy = this.props.data.fields[this.props.list.tracking.createdBy];
			if (data.createdBy && data.createdBy.name) {
				let createdByName = getNameFromData(data.createdBy.name);
				if (createdByName) {
					elements.push(_react2.default.createElement(
						_elemental.FormField,
						{ key: 'createdBy', label: 'Created by' },
						_react2.default.createElement(
							_elemental.FormInput,
							{ noedit: true },
							data.createdBy.name.first,
							' ',
							data.createdBy.name.last
						)
					));
				}
			}
		}

		if (this.props.list.tracking.updatedAt) {
			data.updatedAt = this.props.data.fields[this.props.list.tracking.updatedAt];
			if (data.updatedAt && (!data.createdAt || data.createdAt !== data.updatedAt)) {
				elements.push(_react2.default.createElement(
					_elemental.FormField,
					{ key: 'updatedAt', label: 'Updated on' },
					_react2.default.createElement(
						_elemental.FormInput,
						{ noedit: true, title: (0, _moment2.default)(data.updatedAt).format('DD/MM/YYYY h:mm:ssa') },
						(0, _moment2.default)(data.updatedAt).format('Do MMM YYYY')
					)
				));
			}
		}

		if (this.props.list.tracking.updatedBy) {
			data.updatedBy = this.props.data.fields[this.props.list.tracking.updatedBy];
			if (data.updatedBy && data.updatedBy.name) {
				let updatedByName = getNameFromData(data.updatedBy.name);
				if (updatedByName) {
					elements.push(_react2.default.createElement(
						_elemental.FormField,
						{ key: 'updatedBy', label: 'Updated by' },
						_react2.default.createElement(
							_elemental.FormInput,
							{ noedit: true },
							data.updatedBy.name.first,
							' ',
							data.updatedBy.name.last
						)
					));
				}
			}
		}

		return Object.keys(elements).length ? _react2.default.createElement(
			'div',
			{ className: 'EditForm__meta' },
			_react2.default.createElement(
				'h3',
				{ className: 'form-heading' },
				'Meta'
			),
			elements
		) : null;
	},

	render() {
		return _react2.default.createElement(
			'form',
			{ ref: 'editForm', className: 'EditForm-container' },
			this.state.alerts ? _react2.default.createElement(_AlertMessages2.default, { alerts: this.state.alerts }) : null,
			_react2.default.createElement(
				_elemental.Grid.Row,
				null,
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ large: 'three-quarters' },
					_react2.default.createElement(
						_elemental.Form,
						{ layout: 'horizontal', component: 'div' },
						this.renderNameField(),
						this.renderKeyOrId(),
						this.renderFormElements(),
						this.renderTrackingMeta()
					)
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ large: 'one-quarter' },
					_react2.default.createElement('span', null)
				)
			),
			this.renderFooterBar(),
			_react2.default.createElement(
				_ConfirmationDialog2.default,
				{
					confirmationLabel: 'Reset',
					isOpen: this.state.resetDialogIsOpen,
					onCancel: this.toggleResetDialog,
					onConfirmation: this.handleReset
				},
				_react2.default.createElement(
					'p',
					null,
					'Reset your changes to ',
					_react2.default.createElement(
						'strong',
						null,
						this.props.data.name
					),
					'?'
				)
			),
			_react2.default.createElement(
				_ConfirmationDialog2.default,
				{
					confirmationLabel: 'Delete',
					isOpen: this.state.deleteDialogIsOpen,
					onCancel: this.toggleDeleteDialog,
					onConfirmation: this.handleDelete
				},
				'Are you sure you want to delete ',
				_react2.default.createElement(
					'strong',
					null,
					this.props.data.name,
					'?'
				),
				_react2.default.createElement('br', null),
				_react2.default.createElement('br', null),
				'This cannot be undone.'
			)
		);
	}
});

const styles = {
	footerbar: {
		backgroundColor: (0, _color.fade)(_theme2.default.color.body, 93),
		boxShadow: '0 -2px 0 rgba(0, 0, 0, 0.1)',
		paddingBottom: 20,
		paddingTop: 20,
		zIndex: 99
	},
	footerbarInner: {
		height: _theme2.default.component.height },
	deleteButton: {
		float: 'right'
	}
};

module.exports = EditForm;