import Field from '../Field';
import React from 'react';
import {
	InlineGroup as Group,
	InlineGroupSection as Section,
	Modal,
} from '../../../admin/client/App/elemental';

import PriceForm from './RentPriceFieldModalForm';
import FileChangeMessage from '../../components/FileChangeMessage';

const debug = require('debug')('keystone:fields/types/RentPriceField'); // eslint-disable-line

module.exports = Field.create({

	displayName: 'RentPriceField',

	updatePrice (props) {
		debug(props);
	},

	onCancel () {
		this.setState({ showModal: false });
	},

	showForm (e) {
		this.setState({ showModal: true });
	},

	renderField () {
		const { path, value, values } = this.props;
		const { updated } = this.state;
		debug('renderField ()', this);

		const updatedMessage = this.state.updated ? (
			<Section hidden={!updated}>
				<FileChangeMessage color="success">
					Save to Update
				</FileChangeMessage>
			</Section>
		) : null;

		return (
			<Group className="field-type-rentstatus">
				<FileChangeMessage color="info">
					<a href="#editPrice" onClick={this.showForm}>
						{value || 'Click to Set'}
					</a>
				</FileChangeMessage>

				{ updatedMessage }

				<Modal.Dialog
					backdropClosesModal
					isOpen={this.state.showModal}
					onClose={this.onCancel}
				>
					<PriceForm
						path={path}
						value={value}
						values={values}
						onCancel={this.onCancel}
						onChange={this.updatePrice} />
				</Modal.Dialog>
			</Group>
		);
	},

});
