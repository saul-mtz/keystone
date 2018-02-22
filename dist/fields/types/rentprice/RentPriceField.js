'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _RentPriceFieldModalForm = require('./RentPriceFieldModalForm');

var _RentPriceFieldModalForm2 = _interopRequireDefault(_RentPriceFieldModalForm);

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('keystone:fields/types/RentPriceField'); // eslint-disable-line

module.exports = _Field2.default.create({

	displayName: 'RentPriceField',

	updatePrice(props) {
		debug(props);
	},

	onCancel() {
		this.setState({ showModal: false });
	},

	showForm(e) {
		this.setState({ showModal: true });
	},

	renderField() {
		const { path, value, values } = this.props;
		const { updated } = this.state;
		debug('renderField ()', this);

		const updatedMessage = this.state.updated ? _react2.default.createElement(
			_elemental.InlineGroupSection,
			{ hidden: !updated },
			_react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'success' },
				'Save to Update'
			)
		) : null;

		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ className: 'field-type-rentstatus' },
			_react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'info' },
				_react2.default.createElement(
					'a',
					{ href: '#editPrice', onClick: this.showForm },
					value || 'Click to Set'
				)
			),
			updatedMessage,
			_react2.default.createElement(
				_elemental.Modal.Dialog,
				{
					backdropClosesModal: true,
					isOpen: this.state.showModal,
					onClose: this.onCancel
				},
				_react2.default.createElement(_RentPriceFieldModalForm2.default, {
					path: path,
					value: value,
					values: values,
					onCancel: this.onCancel,
					onChange: this.updatePrice })
			)
		);
	}

});