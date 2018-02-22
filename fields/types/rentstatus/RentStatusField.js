import Field from '../Field';
import React from 'react';
import {
	Button,
	Form,
	FormField,
	FormInput,
	FormNote,
	InlineGroup as Group,
	InlineGroupSection as Section,
	Modal,
} from '../../../admin/client/App/elemental';

import FileChangeMessage from '../../components/FileChangeMessage';

import StateMachine from 'fsm-as-promised';

const debug = require('debug')('keystone:fields/types/RentStatusField'); // eslint-disable-line

class DetailsForm extends React.Component {

	constructor () {
		super();
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange (e) {
		const value = e.target.value;
		this.setState({ value });
	}

	render () {
		const { onCancel, updateStatus, event } = this.props;
		const { value } = this.state;
		const isValid = value && typeof value === 'string' && value.length > 4;

		return (
			<Form layout="horizontal">
				<Modal.Header text="Status change details" showCloseButton />
				<Modal.Body>
					<FormField label="Details">
						<FormInput
							autoFocus
							autoComplete="off"
							multiline
							style={{ height: 60 }}
							name="status-change-details"
							onChange={this.onChange}
						/>
						<FormNote html="Write some details about this status transition, why was it rejected?, cancelled, etc." />
					</FormField>
				</Modal.Body>
				<Modal.Footer>
					<Button
						color="success"
						disabled={!isValid}
						onClick={() => { updateStatus({ details: value, event }); }}>
						Update Status
					</Button>
					<Button
						variant="link"
						color="cancel"
						data-button-type="cancel"
						onClick={onCancel}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		);
	}
};

module.exports = Field.create({

	displayName: 'RentStatusField',

	componentWillMount () {
		this.init();
	},

	statusChangeRequest (event) {
		// if the events starts with manual_* a manual description is mandatory
		// use state.showStatusMessageForm to show the details field
		const showStatusMessageForm = /manual_*/.test(event.name);
		if (showStatusMessageForm) {
			this.setState({ showStatusMessageForm, event });
		} else {
			this.updateStatus({ event });
		}
	},

	init () {
		const { stateMachine, value } = this.props;
		this.currentStatus = value;
		const config = Object.assign({}, stateMachine.config, { initial: value });
		this.fsm = StateMachine(config);
		this.nextEvent = null;
	},

	updateStatus ({ event, details }) {
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

	onCancel () {
		this.nextEvent = undefined;
		this.setState({ showStatusMessageForm: false, details: undefined });
	},

	detailsForm () {
		const { event, showStatusMessageForm } = this.state;

		if (!showStatusMessageForm) {
			return null;
		}

		const formProps = {
			onCancel: this.onCancel,
			updateStatus: this.updateStatus,
			event,
		};

		return <DetailsForm {...formProps} />;
	},

	renderField () {
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
			value,
		};

		if (value !== currentStatus) {
			// status changed
			changed = true;

			// hidden input field with the serialized event and details of the transition
			inputProps.value = JSON.stringify({ event: this.state.event, details: this.state.details });

			updatedMessage = (
				<Section hidden={!changed}>
					<FileChangeMessage color="success">
						Save to Update
					</FileChangeMessage>
				</Section>
			);
		}

		// danger: final
		// warning: initial, conflict
		// info: intermediate
		const color = value === 'created' ? 'warning' : (fsm.isFinal(value) ? 'danger' : 'info');
		const events = stateMachine.config.events.filter(({ from, name }) => {
			// check the current state is in the "from" definition
			// check that the transition is not an automatic transition (starts with auto_*)
			return from.indexOf(currentStatus) !== -1 && !/^auto_/.test(name);
		});

		const self = this;

		return (
			<Group className="field-type-rentstatus">
				<Section>
					<FileChangeMessage color={color}>
						{changed ? this.nextEvent.to : value}
					</FileChangeMessage>
				</Section>
				{
					events.map(event => (
						<Section key={`section-${event.name}`} grow>
							<Button disabled={changed} onClick={() => self.statusChangeRequest(event)} >
								{event.name}
							</Button>
						</Section>
					))
				}

				<input {...inputProps} />
				{ updatedMessage }

				<Modal.Dialog
					backdropClosesModal
					isOpen={this.state.showStatusMessageForm}
					onClose={this.onCancel}
				>
					{this.detailsForm()}
				</Modal.Dialog>
			</Group>
		);
	},

});
