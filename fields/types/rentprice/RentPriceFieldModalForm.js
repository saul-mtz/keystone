import React from 'react';
import {
	Alert,
	Form,
	FormField,
	FormNote,
	Modal,
} from '../../../admin/client/App/elemental';

import { Button, FormInput, InputGroup, Table } from 'elemental';

import {
	init as initPrice,
	costPerKmExtra,
} from './lib/price';

import { format as formatPrice, iva } from '../carengomoney/lib';
import MoneyField from '../carengomoney/CarengoMoneyField';

const debug = require('debug')('keystone:fields/types/RentPriceModalForm'); // eslint-disable-line

const styleTotal = {
	color: 'rgb(214, 66, 66)',
	fontSize: '1.2em',
};

const styleInputGroup = {
	marginBottom: 0,
};

const { currency, locale } = Keystone;

const ErrorMessage = ({ msg }) => (
	<Modal.Body>
		<Alert color="danger">{msg}</Alert>
	</Modal.Body>
);

class PriceForm extends React.Component {

	constructor (props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange (a, b, c, d) {
		console.log({ a, b, c, d });
	}

	render () {
		const { editMode, prefixName, data, onChange, path } = this.props;
		const disabled = !editMode;

		const {
			rentDays: days,
			discount,
			extraKm,
			pricePerDay,
			securityDeposit,
		} = data;

		const total = (pricePerDay * days) - discount + (costPerKmExtra * extraKm) + securityDeposit;
		const totalIVA = total * iva;
		const subtotal = total - totalIVA;

		const pricePerDayWithoutIVA = pricePerDay * (1 - iva);
		const priceDaysWithoutIVA = pricePerDayWithoutIVA * days;
		const costPerKmExtraWithoutIVA = costPerKmExtra * (1 - iva);
		const priceMilleageWithoutIVA = costPerKmExtraWithoutIVA * extraKm;
		const discountWithoutIVA = discount * (1 - iva);
		const securityDepositWithoutIVA = securityDeposit * (1 - iva);

		const buttonType = disabled ? 'default' : 'hollow-primary';
		const commontProps = {
			disabled,
			inputNamePrefix: path,
			onChange: this.onChange,
			taxIncluded: true,
		};

		return (
			<Modal.Body>
				<FormField label="Num Days">
					<FormInput noedit>{days}</FormInput>
				</FormField>
				<MoneyField
					{...commontProps}
					forceInteger
					label="Price per day"
					path="pricePerDay"
					value={pricePerDay}
				/>
				<FormField label="Security Deposit">
					<InputGroup contiguous style={styleInputGroup}>
						<InputGroup.Section type={buttonType}>
							<Button type={buttonType}>$</Button>
						</InputGroup.Section>
						<InputGroup.Section grow>
							<FormInput name={`${prefixName}[securityDeposit]`} disabled={disabled} value={securityDeposit} type="number" onChange={onChange} />
						</InputGroup.Section>
						<InputGroup.Section>
							<Button type={buttonType}>IVA included</Button>
						</InputGroup.Section>
					</InputGroup>
				</FormField>
				<FormField label="Discount Amount">
					<InputGroup contiguous style={styleInputGroup}>
						<InputGroup.Section type={buttonType}>
							<Button type={buttonType}>$</Button>
						</InputGroup.Section>
						<InputGroup.Section grow>
							<FormInput name={`${prefixName}[discount]`} disabled={disabled} value={discount} type="number" onChange={onChange} />
						</InputGroup.Section>
						<InputGroup.Section>
							<Button type={buttonType}>IVA included</Button>
						</InputGroup.Section>
					</InputGroup>
				</FormField>
				<FormField label="Extra kilometers">
					<InputGroup contiguous style={styleInputGroup}>
						<InputGroup.Section grow>
							<FormInput name={`${prefixName}[extraKm]`} disabled={disabled} value={extraKm} type="number" onChange={onChange}/>
						</InputGroup.Section>
						<InputGroup.Section>
							<Button type={buttonType}>km</Button>
						</InputGroup.Section>
					</InputGroup>
				</FormField>
				<Table>
					<tbody>
						<tr>
							<td>
								<label>Rent Price</label>
								<FormNote html={`${formatPrice(pricePerDayWithoutIVA)} x ${days} days`} />
							</td>
							<td>{formatPrice(priceDaysWithoutIVA)}</td>
						</tr>
						{ securityDeposit < 1 ? null : (
							<tr>
								<td>
									<label>Security Deposit</label>
								</td>
								<td>{formatPrice(securityDepositWithoutIVA)}</td>
							</tr>
						)}
						{ discount < 1 ? null : (
							<tr>
								<td>
									<label>Discount</label>
								</td>
								<td>-{formatPrice(discountWithoutIVA)}</td>
							</tr>
						)}
						{ extraKm < 1 ? null : (
							<tr>
								<td>
									<label>Extra kilometers</label>
									<FormNote html={`$${costPerKmExtraWithoutIVA} x ${extraKm} kms`} />
								</td>
								<td>{formatPrice(priceMilleageWithoutIVA)}</td>
							</tr>
						)}
						<tr>
							<td><strong>Subtotal</strong></td>
							<td><strong>{formatPrice(subtotal)}</strong></td>
						</tr>
						<tr>
							<td><strong>IVA 16%</strong></td>
							<td><strong>{formatPrice(totalIVA)}</strong></td>
						</tr>
						<tr>
							<td><strong style={styleTotal}>Total</strong></td>
							<td><strong style={styleTotal}>{formatPrice(total)}</strong></td>
						</tr>
					</tbody>
				</Table>
			</Modal.Body>
		);
	}
};


const Footer = (props) => {
	const { canUpdate, editMode, onCancel, onEnableEdit, onUpdate } = props;

	if (editMode) {
		return (
			<div>
				<Button type="success" disabled={canUpdate} onClick={onUpdate}>
					Update Price
				</Button>
				<Button type="link-cancel" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		);
	}

	return <Button type="warning" onClick={onEnableEdit}>Update</Button>;
};

class ModalContainer extends React.Component {
	constructor (props) {
		super(props);
		const initValues = Object.assign({}, props.values, props.value);
		this.state = { editMode: false, data: initPrice(initValues) };
		this.enableEdit = this.enableEdit.bind(this);
		this.onUpdatePrice = this.onUpdatePrice.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	enableEdit () {
		this.setState({ editMode: true });
	}

	onChange (event) {
		const value = event.target.value;
		const name = event.target.name;
		const fieldName = name.match(/^price\[(.+)\]$/)[1];
		const parsedValue = fieldName === 'extraKm' ? parseInt(value, 10) : parseFloat(value);

		debugger;
		const { data } = this.state;
		data[fieldName] = parsedValue;
		const isValid = false;
		this.setState({ data, isValid });
	}

	onUpdatePrice () {
		debugger;
	}

	render () {
		const { editMode } = this.state;
		const { onCancel } = this.props;

		return (
			<Form layout="horizontal">
				<Modal.Header text="Update Rent Price" showCloseButton />
				<Modal.Body>
					<PriceForm {...this.props} {...this.state} onChange={this.onChange} />
				</Modal.Body>
				<Modal.Footer>
					<Footer editMode={editMode} onCancel={onCancel} onEnableEdit={this.enableEdit} onUpdate={this.onUpdatePrice} canUpdate={!this.state.isValid}/>
				</Modal.Footer>
			</Form>
		);
	}
}


export default ModalContainer;
