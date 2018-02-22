'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global google */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _NestedFormField = require('../../components/NestedFormField');

var _NestedFormField2 = _interopRequireDefault(_NestedFormField);

var _CollapsedFieldLabel = require('../../components/CollapsedFieldLabel');

var _CollapsedFieldLabel2 = _interopRequireDefault(_CollapsedFieldLabel);

var _theme = require('../../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _elemental = require('../../../admin/client/App/elemental');

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('keystone:fields/types/LocationAutocomplete'); // eslint-disable-line

const formatAddress = result => {
	const location = {};

	_lodash2.default.forEach(result.address_components, function (val) {
		if (_lodash2.default.indexOf(val.types, 'street_number') >= 0) {
			location.street_number = val.long_name;
		}
		if (_lodash2.default.indexOf(val.types, 'route') >= 0) {
			location.street_name = val.long_name;
		}
		// in some cases, you get sublocality, city as locality - so only use the first
		if (_lodash2.default.indexOf(val.types, 'sublocality') >= 0 && !location.sublocality) {
			location.sublocality = val.long_name;
		}
		// TODO: find a way to get the "Delegación" value for CDMX
		if (_lodash2.default.indexOf(val.types, 'locality') >= 0 && val.long_name !== 'Ciudad de México') {
			location.locality = val.long_name;
		}
		if (_lodash2.default.indexOf(val.types, 'administrative_area_level_1') >= 0) {
			location.state = val.long_name;
		}
		if (_lodash2.default.indexOf(val.types, 'country') >= 0) {
			location.country = val.long_name;
		}
		if (_lodash2.default.indexOf(val.types, 'postal_code') >= 0) {
			location.postal_code = val.long_name;
		}
	});

	// https://stackoverflow.com/a/15714477/2938519
	// lng,lat
	location.geo = `${result.geometry.location.lng()},${result.geometry.location.lat()}`;
	location.place_id = result.place_id;
	location.formatted = result.formatted_address;

	if (location.street_name) {
		return location;
	}

	return {};
};

/**
 * TODO:
 * - Remove dependency on underscore
 * - Custom path support
 */
module.exports = _Field2.default.create({

	displayName: 'LocationField',
	statics: { type: 'Location' },

	getInitialState() {
		return {
			collapsed: true,
			inputMode: 'autocomplete' };
	},

	initGoogle() {
		// init the Google Autocomplete service
		// https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
		this.googleAutocompleteService = new google.maps.places.AutocompleteService() || null;
		this.googlePlacesService = new google.maps.places.PlacesService(document.getElementById('carengo-map')) || null;
	},

	componentDidMount() {
		if (!window.google) {
			(0, _timers.setTimeout)(() => {
				this.initGoogle();
			}, 2000);
		} else {
			this.initGoogle();
		}
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

	formatValue() {
		const { value = {} } = this.props;
		if (value.formatted) {
			return value.formatted;
		}

		return _lodash2.default.compact([value.street_name, value.street_number, value.sublocality, value.locality, value.state, value.postal_code, value.country]).join(', ');
	},

	renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.formatValue() || ''
		);
	},

	isFieldDisabled({ fieldPath, value }) {
		if (['country', 'place_id', 'geo'].indexOf(fieldPath) !== -1) {
			return true;
		}
		return !!this.place[fieldPath];
	},

	renderField(fieldPath, label) {
		const { value: currentValue = {}, path } = this.props;
		const value = currentValue[fieldPath] || '';
		const name = this.getInputName(`${path}.${fieldPath}`);
		const disabled = this.isFieldDisabled({ fieldPath, value });
		const style = disabled ? {} : { borderColor: _theme2.default.color.danger };
		const autoFocus = false;

		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: label, 'data-field-location-path': path + '.' + fieldPath },
			_react2.default.createElement(_elemental.FormInput, {
				autoFocus: autoFocus,
				readOnly: disabled,
				disabled: disabled,
				name: name,
				onChange: this.makeChanger(fieldPath),
				placeholder: label,
				value: value,
				style: style
			})
		);
	},

	renderNote() {
		const { note } = this.props;
		if (!note) return null;
		return _react2.default.createElement(
			_elemental.FormField,
			{ offsetAbsentLabel: true },
			_react2.default.createElement(_elemental.FormNote, { html: note })
		);
	},

	toggleCollapsed() {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	},

	toggleInputMode() {
		const { inputMode } = this.state;
		let updatedState;
		if (inputMode === 'autocomplete') {
			updatedState = {
				inputMode: 'manual',
				collapsed: false
			};
		} else {
			updatedState = {
				inputMode: 'autocomplete',
				collapsed: true
			};
		}
		this.setState(updatedState);
	},

	onPlaceChosen(placeId) {
		const { path, onChange } = this.props;

		// the user clear the filed
		if (!placeId) {
			return this.setState({ collapsed: true }, () => onChange({ path }));
		}

		const self = this;
		// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
		this.googlePlacesService.getDetails({ placeId }, function (placeResult, placesServiceStatus) {
			const value = formatAddress(placeResult);
			self.place = value;
			self.setState({ collapsed: false }, () => {
				debug({ path, placeId, placeResult, placesServiceStatus, value });
				onChange({ path, value });
			});
		});
	},

	getPredictions(input, callback) {
		if (!input || typeof input !== 'string' || input.length < 3) {
			return callback(null, { options: [] });
		}

		const autocompletionRequest = {
			input,
			componentRestrictions: { country: 'MX' },
			types: ['address']
		};

		this.googleAutocompleteService.getPlacePredictions(autocompletionRequest, function (predictions, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error({ predictions, status });
				return callback(null, { options: [] });
			}

			const options = predictions.filter(place => place.types && (place.types.indexOf('street_address') !== -1 || place.types.indexOf('route') !== -1)).map(place => ({
				value: place.place_id,
				label: place.description
			}));

			debug({ options });
			callback(null, { options });
		});
	},

	renderAddressFields() {
		const { inputMode, collapsed } = this.state;
		const autocomplete = inputMode === 'autocomplete';

		if (autocomplete && collapsed) {
			return null;
		}

		const style = {
			border: 'solid 1px #ccc',
			borderRadius: '0.3rem',
			padding: '0.4rem 0.6rem',
			marginTop: autocomplete ? '1em' : 'auto',
			width: '100%'
		};
		// renderField(fieldPath, label, disabled, focus) {
		return _react2.default.createElement(
			'div',
			{ style: style },
			this.renderField('street_name', 'Street Name'),
			this.renderField('street_number', 'Street Number'),
			this.renderField('sublocality', 'Sublocality (Colonia)'),
			this.renderField('locality', 'Locality (Delegación/Municipio)'),
			this.renderField('state', 'State'),
			this.renderField('postal_code', 'Postcode'),
			this.renderField('country', 'Country'),
			this.renderField('place_id', 'Place Id'),
			this.renderField('geo', 'Coordinates')
		);
	},

	renderAutocompleteInput() {
		if (this.state.inputMode === 'manual') {
			return null;
		}

		const { path, value } = this.props;
		let defaultValue = null;
		if (value && value.formatted) {
			defaultValue = {
				label: _react2.default.createElement(
					'a',
					{ href: `https://www.google.com/maps/place/?q=place_id:${value.place_id}`, target: '_blank' },
					value.formatted
				),
				value: value.formatted
			};
		}

		// const arrowToggle = this.collapsed && defaultValue ? <span className="octicon octicon-plus"></span> : null;
		return _react2.default.createElement(_reactSelect2.default.Async, {
			arrowRenderer: null,
			loadOptions: this.getPredictions,
			name: this.getInputName(`${path}.formatted`),
			onChange: this.onPlaceChosen,
			placeholder: 'Type the address ...',
			value: defaultValue,
			simpleValue: true
		});
	},

	renderLinks() {
		const { inputMode, collapsed } = this.state;
		let switchTo = null;

		if (inputMode === 'manual') {
			switchTo = _react2.default.createElement(
				'span',
				{ style: { marginLeft: '1em' } },
				_react2.default.createElement(
					_CollapsedFieldLabel2.default,
					{ onClick: this.toggleInputMode },
					'Use Autocomplete'
				)
			);
		}

		let showAll = null;
		if (collapsed) {
			return _react2.default.createElement(
				'span',
				{ style: { marginLeft: '1em' } },
				_react2.default.createElement(
					_CollapsedFieldLabel2.default,
					{ onClick: this.toggleCollapsed },
					'Show All Fields'
				)
			);
		}

		return _react2.default.createElement(
			'div',
			{ style: { display: 'inline-block' } },
			switchTo,
			showAll
		);
	},

	renderUI() {
		const { label, path } = this.props;
		this.firstWithErrorsFocused = false;
		if (!this.shouldRenderField()) {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.FormField,
					{ label: this.props.label },
					this.renderValue()
				)
			);
		}

		//
		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'location' },
			_react2.default.createElement('div', { id: 'carengo-map' }),
			_react2.default.createElement(
				_elemental.FormField,
				{ label: label, htmlFor: path },
				this.renderAutocompleteInput(),
				this.renderAddressFields()
			),
			this.renderNote()
		);
	}
});