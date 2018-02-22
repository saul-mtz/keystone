'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

var _fsmAsPromised = require('fsm-as-promised');

var _fsmAsPromised2 = _interopRequireDefault(_fsmAsPromised);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('keystone:fields/types/RentStatusField'); // eslint-disable-line

class DetailsForm extends _react2.default.Component {

	constructor() {
		super();
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const value = e.target.value;
		this.setState({ value });
	}

	render() {
		const { onCancel, updateStatus, event } = this.props;
		const { value } = this.state;
		const isValid = value && typeof value === 'string' && value.length > 4;

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal' },
			_react2.default.createElement(_elemental.Modal.Header, { text: 'Status change details', showCloseButton: true }),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(
					_elemental.FormField,
					{ label: 'Details' },
					_react2.default.createElement(_elemental.FormInput, {
						autoFocus: true,
						autoComplete: 'off',
						multiline: true,
						style: { height: 60 },
						name: 'status-change-details',
						onChange: this.onChange
					}),
					_react2.default.createElement(_elemental.FormNote, { html: 'Write some details about this status transition, why was it rejected?, cancelled, etc.' })
				)
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{
						color: 'success',
						disabled: !isValid,
						onClick: () => {
							updateStatus({ details: value, event });
						} },
					'Update Status'
				),
				_react2.default.createElement(
					_elemental.Button,
					{
						variant: 'link',
						color: 'cancel',
						'data-button-type': 'cancel',
						onClick: onCancel
					},
					'Cancel'
				)
			)
		);
	}
};

module.exports = _Field2.default.create({

	displayName: 'RentStatusField',

	componentWillMount() {
		this.init();
	},

	statusChangeRequest(event) {
		// if the events starts with manual_* a manual description is mandatory
		// use state.showStatusMessageForm to show the details field
		const showStatusMessageForm = /manual_*/.test(event.name);
		if (showStatusMessageForm) {
			this.setState({ showStatusMessageForm, event });
		} else {
			this.updateStatus({ event });
		}
	},

	init() {
		const { stateMachine, value } = this.props;
		this.currentStatus = value;
		const config = Object.assign({}, stateMachine.config, { initial: value });
		this.fsm = (0, _fsmAsPromised2.default)(config);
		this.nextEvent = null;
	},

	updateStatus({ event, details }) {
		const { fsm } = this;
		if (fsm.can(event.name) && event.to !== this.currentStatus) {
			this.nextEvent = event;
			this.setState({ showStatusMessageForm: false, details, event }, () => {
				const { path, onChange } = this.props;
				debug(`Event '${event.name}' to move from '${event.from}' to '${event.to}'`);
				onChange({ path, value: event.to });
			});
		} else {
			console.error('Invalid event', event);
		}
	},

	onCancel() {
		this.nextEvent = undefined;
		this.setState({ showStatusMessageForm: false, details: undefined });
	},

	detailsForm() {
		const { event, showStatusMessageForm } = this.state;

		if (!showStatusMessageForm) {
			return null;
		}

		const formProps = {
			onCancel: this.onCancel,
			updateStatus: this.updateStatus,
			event
		};

		return _react2.default.createElement(DetailsForm, formProps);
	},

	renderField() {
		const { edited, reset, stateMachine, value } = this.props;
		let changed = false;
		let updatedMessage;

		// handle reset
		if (reset && value !== this.fsm.current) {
			this.init();
		}

		// handle first render after edit
		if (edited && value !== this.fsm.current) {
			this.init();
		}

		const { currentStatus, fsm } = this;

		const inputProps = {
			name: this.getInputName(this.props.path),
			type: 'hidden',
			value
		};

		if (value !== currentStatus) {
			// status changed
			changed = true;

			// hidden input field with the serialized event and details of the transition
			inputProps.value = JSON.stringify({ event: this.state.event, details: this.state.details });

			updatedMessage = _react2.default.createElement(
				_elemental.InlineGroupSection,
				{ hidden: !changed },
				_react2.default.createElement(
					_FileChangeMessage2.default,
					{ color: 'success' },
					'Save to Update'
				)
			);
		}

		// danger: final
		// warning: initial, conflict
		// info: intermediate
		const color = value === 'created' ? 'warning' : fsm.isFinal(value) ? 'danger' : 'info';
		const events = stateMachine.config.events.filter(({ from, name }) => {
			// check the current state is in the "from" definition
			// check that the transition is not an automatic transition (starts with auto_*)
			return from.indexOf(currentStatus) !== -1 && !/^auto_/.test(name);
		});

		const self = this;

		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ className: 'field-type-rentstatus' },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_FileChangeMessage2.default,
					{ color: color },
					changed ? this.nextEvent.to : value
				)
			),
			events.map(event => _react2.default.createElement(
				_elemental.InlineGroupSection,
				{ key: `section-${event.name}`, grow: true },
				_react2.default.createElement(
					_elemental.Button,
					{ disabled: changed, onClick: () => self.statusChangeRequest(event) },
					event.name
				)
			)),
			_react2.default.createElement('input', inputProps),
			updatedMessage,
			_react2.default.createElement(
				_elemental.Modal.Dialog,
				{
					backdropClosesModal: true,
					isOpen: this.state.showStatusMessageForm,
					onClose: this.onCancel
				},
				this.detailsForm()
			)
		);
	}

});