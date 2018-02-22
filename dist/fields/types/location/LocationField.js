'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _CollapsedFieldLabel = require('../../components/CollapsedFieldLabel');

var _CollapsedFieldLabel2 = _interopRequireDefault(_CollapsedFieldLabel);

var _NestedFormField = require('../../components/NestedFormField');

var _NestedFormField2 = _interopRequireDefault(_NestedFormField);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Remove dependency on underscore
 * - Custom path support
 */

module.exports = _Field2.default.create({

	displayName: 'LocationField',
	statics: {
		type: 'Location'
	},

	getInitialState() {
		return {
			collapsedFields: {},
			improve: false,
			overwrite: false
		};
	},

	componentWillMount() {
		const { value = [] } = this.props;
		var collapsedFields = {};
		_lodash2.default.forEach(['number', 'name', 'street2', 'geo'], i => {
			if (!value[i]) {
				collapsedFields[i] = true;
			}
		}, this);
		this.setState({ collapsedFields });
	},

	shouldCollapse() {
		return this.props.collapse && !this.formatValue();
	},

	uncollapseFields() {
		this.setState({
			collapsedFields: {}
		});
	},

	fieldChanged(fieldPath, event) {
		const { value = {}, path, onChange } = this.props;
		onChange({
			path,
			value: _extends({}, value, {
				[fieldPath]: event.target.value
			})
		});
	},

	makeChanger(fieldPath) {
		return this.fieldChanged.bind(this, fieldPath);
	},

	geoChanged(i, event) {
		const { value = {}, path, onChange } = this.props;
		const newVal = event.target.value;
		const geo = [i === 0 ? newVal : value.geo ? value.geo[0] : '', i === 1 ? newVal : value.geo ? value.geo[1] : ''];
		onChange({
			path,
			value: _extends({}, value, {
				geo
			})
		});
	},

	makeGeoChanger(fieldPath) {
		return this.geoChanged.bind(this, fieldPath);
	},

	formatValue() {
		const { value = {} } = this.props;
		return _lodash2.default.compact([value.number, value.name, value.street1, value.street2, value.suburb, value.state, value.postcode, value.country]).join(', ');
	},

	renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.formatValue() || ''
		);
	},

	renderField(fieldPath, label, collapse, autoFocus) {
		if (this.state.collapsedFields[fieldPath]) {
			return null;
		}
		const { value = {}, path } = this.props;
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: label, 'data-field-location-path': path + '.' + fieldPath },
			_react2.default.createElement(_elemental.FormInput, {
				autoFocus: autoFocus,
				name: this.getInputName(path + '.' + fieldPath),
				onChange: this.makeChanger(fieldPath),
				placeholder: label,
				value: value[fieldPath] || ''
			})
		);
	},

	renderSuburbState() {
		const { value = {}, path } = this.props;
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: 'Suburb / State', 'data-field-location-path': path + '.suburb_state' },
			_react2.default.createElement(
				_elemental.Grid.Row,
				{ gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'two-thirds', 'data-field-location-path': path + '.suburb' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(path + '.suburb'),
						onChange: this.makeChanger('suburb'),
						placeholder: 'Suburb',
						value: value.suburb || ''
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'one-third', 'data-field-location-path': path + '.state' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(path + '.state'),
						onChange: this.makeChanger('state'),
						placeholder: 'State',
						value: value.state || ''
					})
				)
			)
		);
	},

	renderPostcodeCountry() {
		const { value = {}, path } = this.props;
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: 'Postcode / Country', 'data-field-location-path': path + '.postcode_country' },
			_react2.default.createElement(
				_elemental.Grid.Row,
				{ gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'one-third', 'data-field-location-path': path + '.postcode' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(path + '.postcode'),
						onChange: this.makeChanger('postcode'),
						placeholder: 'Post Code',
						value: value.postcode || ''
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'two-thirds', 'data-field-location-path': path + '.country' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(path + '.country'),
						onChange: this.makeChanger('country'),
						placeholder: 'Country',
						value: value.country || ''
					})
				)
			)
		);
	},

	renderGeo() {
		if (this.state.collapsedFields.geo) {
			return null;
		}
		const { value = {}, path, paths } = this.props;
		const geo = value.geo || [];
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: 'Lat / Lng', 'data-field-location-path': path + '.geo' },
			_react2.default.createElement(
				_elemental.Grid.Row,
				{ gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'one-half', 'data-field-location-path': 'latitude' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(paths.geo + '[1]'),
						onChange: this.makeGeoChanger(1),
						placeholder: 'Latitude',
						value: geo[1] || ''
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					{ small: 'one-half', 'data-field-location-path': 'longitude' },
					_react2.default.createElement(_elemental.FormInput, {
						name: this.getInputName(paths.geo + '[0]'),
						onChange: this.makeGeoChanger(0),
						placeholder: 'Longitude',
						value: geo[0] || ''
					})
				)
			)
		);
	},

	updateGoogleOption(key, e) {
		var newState = {};
		newState[key] = e.target.checked;
		this.setState(newState);
	},

	makeGoogler(key) {
		return this.updateGoogleOption.bind(this, key);
	},

	renderGoogleOptions() {
		const { paths, enableMapsAPI } = this.props;
		if (!enableMapsAPI) return null;
		var replace = this.state.improve ? _react2.default.createElement(_elemental.LabelledControl, {
			checked: this.state.overwrite,
			label: 'Replace existing data',
			name: this.getInputName(paths.overwrite),
			onChange: this.makeGoogler('overwrite'),
			type: 'checkbox'
		}) : null;
		return _react2.default.createElement(
			_elemental.FormField,
			{ offsetAbsentLabel: true },
			_react2.default.createElement(_elemental.LabelledControl, {
				checked: this.state.improve,
				label: 'Autodetect and improve location on save',
				name: this.getInputName(paths.improve),
				onChange: this.makeGoogler('improve'),
				title: 'When checked, this will attempt to fill missing fields. It will also get the lat/long',
				type: 'checkbox'
			}),
			replace
		);
	},

	renderNote() {
		const { note } = this.props;
		if (!note) return null;
		return _react2.default.createElement(
			_elemental.FormField,
			{ offsetAbsentLabel: true },
			_react2.default.createElement(_elemental.FormNote, { note: note })
		);
	},

	renderUI() {

		if (!this.shouldRenderField()) {
			return _react2.default.createElement(
				_elemental.FormField,
				{ label: this.props.label },
				this.renderValue()
			);
		}

		/* eslint-disable no-script-url */
		var showMore = !_lodash2.default.isEmpty(this.state.collapsedFields) ? _react2.default.createElement(
			_CollapsedFieldLabel2.default,
			{ onClick: this.uncollapseFields },
			'(show more fields)'
		) : null;
		/* eslint-enable */

		const { label, path } = this.props;
		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'location' },
			_react2.default.createElement(
				_elemental.FormField,
				{ label: label, htmlFor: path },
				showMore
			),
			this.renderField('number', 'PO Box / Shop', true, true),
			this.renderField('name', 'Building Name', true),
			this.renderField('street1', 'Street Address'),
			this.renderField('street2', 'Street Address 2', true),
			this.renderSuburbState(),
			this.renderPostcodeCountry(),
			this.renderGeo(),
			this.renderGoogleOptions(),
			this.renderNote()
		);
	}

});