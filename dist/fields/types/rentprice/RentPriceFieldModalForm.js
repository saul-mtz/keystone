'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _elemental2 = require('elemental');

var _price = require('./lib/price');

var _lib = require('../carengomoney/lib');

var _CarengoMoneyField = require('../carengomoney/CarengoMoneyField');

var _CarengoMoneyField2 = _interopRequireDefault(_CarengoMoneyField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('keystone:fields/types/RentPriceModalForm'); // eslint-disable-line

const styleTotal = {
	color: 'rgb(214, 66, 66)',
	fontSize: '1.2em'
};

const styleInputGroup = {
	marginBottom: 0
};

/*
const { currency, locale } = Keystone;

const ErrorMessage = ({ msg }) => (
	<Modal.Body>
		<Alert color="danger">{msg}</Alert>
	</Modal.Body>
);
*/

class PriceForm extends _react2.default.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(a, b, c, d) {
		console.log({ a, b, c, d });
	}

	render() {
		const { editMode, prefixName, data, onChange, path } = this.props;
		const disabled = !editMode;

		const {
			rentDays: days,
			discount,
			extraKm,
			pricePerDay,
			securityDeposit
		} = data;

		const total = pricePerDay * days - discount + _price.costPerKmExtra * extraKm + securityDeposit;
		const totalIVA = total * _lib.iva;
		const subtotal = total - totalIVA;

		const pricePerDayWithoutIVA = pricePerDay * (1 - _lib.iva);
		const priceDaysWithoutIVA = pricePerDayWithoutIVA * days;
		const costPerKmExtraWithoutIVA = _price.costPerKmExtra * (1 - _lib.iva);
		const priceMilleageWithoutIVA = costPerKmExtraWithoutIVA * extraKm;
		const discountWithoutIVA = discount * (1 - _lib.iva);
		const securityDepositWithoutIVA = securityDeposit * (1 - _lib.iva);

		const buttonType = disabled ? 'default' : 'hollow-primary';
		const commontProps = {
			disabled,
			inputNamePrefix: path,
			onChange: this.onChange,
			taxIncluded: true
		};

		return _react2.default.createElement(
			_elemental.Modal.Body,
			null,
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Num Days' },
				_react2.default.createElement(
					_elemental2.FormInput,
					{ noedit: true },
					days
				)
			),
			_react2.default.createElement(_CarengoMoneyField2.default, _extends({}, commontProps, {
				forceInteger: true,
				label: 'Price per day',
				path: 'pricePerDay',
				value: pricePerDay
			})),
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Security Deposit' },
				_react2.default.createElement(
					_elemental2.InputGroup,
					{ contiguous: true, style: styleInputGroup },
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						{ type: buttonType },
						_react2.default.createElement(
							_elemental2.Button,
							{ type: buttonType },
							'$'
						)
					),
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						{ grow: true },
						_react2.default.createElement(_elemental2.FormInput, { name: `${prefixName}[securityDeposit]`, disabled: disabled, value: securityDeposit, type: 'number', onChange: onChange })
					),
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						null,
						_react2.default.createElement(
							_elemental2.Button,
							{ type: buttonType },
							'IVA included'
						)
					)
				)
			),
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Discount Amount' },
				_react2.default.createElement(
					_elemental2.InputGroup,
					{ contiguous: true, style: styleInputGroup },
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						{ type: buttonType },
						_react2.default.createElement(
							_elemental2.Button,
							{ type: buttonType },
							'$'
						)
					),
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						{ grow: true },
						_react2.default.createElement(_elemental2.FormInput, { name: `${prefixName}[discount]`, disabled: disabled, value: discount, type: 'number', onChange: onChange })
					),
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						null,
						_react2.default.createElement(
							_elemental2.Button,
							{ type: buttonType },
							'IVA included'
						)
					)
				)
			),
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Extra kilometers' },
				_react2.default.createElement(
					_elemental2.InputGroup,
					{ contiguous: true, style: styleInputGroup },
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						{ grow: true },
						_react2.default.createElement(_elemental2.FormInput, { name: `${prefixName}[extraKm]`, disabled: disabled, value: extraKm, type: 'number', onChange: onChange })
					),
					_react2.default.createElement(
						_elemental2.InputGroup.Section,
						null,
						_react2.default.createElement(
							_elemental2.Button,
							{ type: buttonType },
							'km'
						)
					)
				)
			),
			_react2.default.createElement(
				_elemental2.Table,
				null,
				_react2.default.createElement(
					'tbody',
					null,
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'label',
								null,
								'Rent Price'
							),
							_react2.default.createElement(_elemental.FormNote, { html: `${(0, _lib.format)(pricePerDayWithoutIVA)} x ${days} days` })
						),
						_react2.default.createElement(
							'td',
							null,
							(0, _lib.format)(priceDaysWithoutIVA)
						)
					),
					securityDeposit < 1 ? null : _react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'label',
								null,
								'Security Deposit'
							)
						),
						_react2.default.createElement(
							'td',
							null,
							(0, _lib.format)(securityDepositWithoutIVA)
						)
					),
					discount < 1 ? null : _react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'label',
								null,
								'Discount'
							)
						),
						_react2.default.createElement(
							'td',
							null,
							'-',
							(0, _lib.format)(discountWithoutIVA)
						)
					),
					extraKm < 1 ? null : _react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'label',
								null,
								'Extra kilometers'
							),
							_react2.default.createElement(_elemental.FormNote, { html: `$${costPerKmExtraWithoutIVA} x ${extraKm} kms` })
						),
						_react2.default.createElement(
							'td',
							null,
							(0, _lib.format)(priceMilleageWithoutIVA)
						)
					),
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'Subtotal'
							)
						),
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								null,
								(0, _lib.format)(subtotal)
							)
						)
					),
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'IVA 16%'
							)
						),
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								null,
								(0, _lib.format)(totalIVA)
							)
						)
					),
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								{ style: styleTotal },
								'Total'
							)
						),
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								'strong',
								{ style: styleTotal },
								(0, _lib.format)(total)
							)
						)
					)
				)
			)
		);
	}
};

const Footer = props => {
	const { canUpdate, editMode, onCancel, onEnableEdit, onUpdate } = props;

	if (editMode) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental2.Button,
				{ type: 'success', disabled: canUpdate, onClick: onUpdate },
				'Update Price'
			),
			_react2.default.createElement(
				_elemental2.Button,
				{ type: 'link-cancel', onClick: onCancel },
				'Cancel'
			)
		);
	}

	return _react2.default.createElement(
		_elemental2.Button,
		{ type: 'warning', onClick: onEnableEdit },
		'Update'
	);
};

class ModalContainer extends _react2.default.Component {
	constructor(props) {
		super(props);
		const initValues = Object.assign({}, props.values, props.value);
		this.state = { editMode: false, data: (0, _price.init)(initValues) };
		this.enableEdit = this.enableEdit.bind(this);
		this.onUpdatePrice = this.onUpdatePrice.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	enableEdit() {
		this.setState({ editMode: true });
	}

	onChange(event) {
		const value = event.target.value;
		const name = event.target.name;
		const fieldName = name.match(/^price\[(.+)\]$/)[1];
		const parsedValue = fieldName === 'extraKm' ? parseInt(value, 10) : parseFloat(value);

		const { data } = this.state;
		data[fieldName] = parsedValue;
		const isValid = false;
		this.setState({ data, isValid });
	}

	onUpdatePrice(a, b, c) {
		debug({ a, b, c });
	}

	render() {
		const { editMode } = this.state;
		const { onCancel } = this.props;

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal' },
			_react2.default.createElement(_elemental.Modal.Header, { text: 'Update Rent Price', showCloseButton: true }),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(PriceForm, _extends({}, this.props, this.state, { onChange: this.onChange }))
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(Footer, { editMode: editMode, onCancel: onCancel, onEnableEdit: this.enableEdit, onUpdate: this.onUpdatePrice, canUpdate: !this.state.isValid })
			)
		);
	}
}

exports.default = ModalContainer;