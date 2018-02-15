/* global google */
import _ from 'lodash';
import React from 'react';
import Field from '../Field';
import NestedFormField from '../../components/NestedFormField';
import CollapsedFieldLabel from '../../components/CollapsedFieldLabel';
import theme from '../../../admin/client/theme';
import Select from 'react-select';

import {
	FormField,
	FormInput,
	FormNote,
} from '../../../admin/client/App/elemental';
import { setTimeout } from 'timers';

const debug = require('debug')('keystone:fields/types/LocationAutocomplete'); // eslint-disable-line

const formatAddress = (result) => {
	const location = {};

	_.forEach(result.address_components, function (val) {
		if (_.indexOf(val.types, 'street_number') >= 0) {
			location.street_number = val.long_name;
		}
		if (_.indexOf(val.types, 'route') >= 0) {
			location.street_name = val.long_name;
		}
		// in some cases, you get sublocality, city as locality - so only use the first
		if (_.indexOf(val.types, 'sublocality') >= 0 && !location.sublocality) {
			location.sublocality = val.long_name;
		}
		// TODO: find a way to get the "Delegación" value for CDMX
		if (_.indexOf(val.types, 'locality') >= 0 && val.long_name !== 'Ciudad de México') {
			location.locality = val.long_name;
		}
		if (_.indexOf(val.types, 'administrative_area_level_1') >= 0) {
			location.state = val.long_name;
		}
		if (_.indexOf(val.types, 'country') >= 0) {
			location.country = val.long_name;
		}
		if (_.indexOf(val.types, 'postal_code') >= 0) {
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
module.exports = Field.create({

	displayName: 'LocationField',
	statics: { type: 'Location' },

	getInitialState () {
		return {
			collapsed: true,
			inputMode: 'autocomplete', // autocomplete | manual
		};
	},

	initGoogle () {
		// init the Google Autocomplete service
		// https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
		this.googleAutocompleteService = new google.maps.places.AutocompleteService() || null;
		this.googlePlacesService = new google.maps.places.PlacesService(document.getElementById('carengo-map')) || null;
	},

	componentDidMount () {
		if (!window.google) {
			setTimeout(() => {
				this.initGoogle();
			}, 2000);
		} else {
			this.initGoogle();
		}
	},

	fieldChanged (fieldPath, event) {
		const { value = {}, path, onChange } = this.props;
		onChange({
			path,
			value: {
				...value,
				[fieldPath]: event.target.value,
			},
		});
	},

	makeChanger (fieldPath) {
		return this.fieldChanged.bind(this, fieldPath);
	},

	formatValue () {
		const { value = {} } = this.props;
		if (value.formatted) {
			return value.formatted;
		}

		return _.compact([
			value.street_name,
			value.street_number,
			value.sublocality,
			value.locality,
			value.state,
			value.postal_code,
			value.country,
		]).join(', ');
	},

	renderValue () {
		return <FormInput noedit>{this.formatValue() || ''}</FormInput>;
	},

	isFieldDisabled ({ fieldPath, value }) {
		if (['country', 'place_id', 'geo'].indexOf(fieldPath) !== -1) {
			return true;
		}
		return !!this.place[fieldPath];
	},

	renderField (fieldPath, label) {
		const { value: currentValue = {}, path } = this.props;
		const value = currentValue[fieldPath] || '';
		const name = this.getInputName(`${path}.${fieldPath}`);
		const disabled = this.isFieldDisabled({ fieldPath, value });
		const style = disabled ? {} : { borderColor: theme.color.danger };
		const autoFocus = false;

		return (
			<NestedFormField label={label} data-field-location-path={path + '.' + fieldPath}>
				<FormInput
					autoFocus={autoFocus}
					readOnly={disabled}
					disabled={disabled}
					name={name}
					onChange={this.makeChanger(fieldPath)}
					placeholder={label}
					value={value}
					style={style}
				/>
			</NestedFormField>
		);
	},

	renderNote () {
		const { note } = this.props;
		if (!note) return null;
		return (
			<FormField offsetAbsentLabel>
				<FormNote html={note} />
			</FormField>
		);
	},

	toggleCollapsed () {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	},

	toggleInputMode () {
		const { inputMode } = this.state;
		let updatedState;
		if (inputMode === 'autocomplete') {
			updatedState = {
				inputMode: 'manual',
				collapsed: false,
			};
		} else {
			updatedState = {
				inputMode: 'autocomplete',
				collapsed: true,
			};
		}
		this.setState(updatedState);
	},

	onPlaceChosen (placeId) {
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

	getPredictions (input, callback) {
		if (!input || typeof input !== 'string' || input.length < 3) {
			return callback(null, { options: [] });
		}

		const autocompletionRequest = {
			input,
			componentRestrictions: { country: 'MX' },
			types: ['address'],
		};

		this.googleAutocompleteService.getPlacePredictions(autocompletionRequest, function(predictions, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error({ predictions, status });
				return callback(null, { options: [] });
			}

			const options = predictions
				.filter(place => place.types && (place.types.indexOf('street_address') !== -1 || place.types.indexOf('route') !== -1))
				.map(place => ({
					value: place.place_id,
					label: place.description,
				}));

			debug({ options });
			callback(null, { options });
		});
	},

	renderAddressFields () {
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
			width: '100%',
		};
		// renderField(fieldPath, label, disabled, focus) {
		return (
			<div style={style}>
				{this.renderField('street_name', 'Street Name')}
				{this.renderField('street_number', 'Street Number')}
				{this.renderField('sublocality', 'Sublocality (Colonia)')}
				{this.renderField('locality', 'Locality (Delegación/Municipio)')}
				{this.renderField('state', 'State')}
				{this.renderField('postal_code', 'Postcode')}
				{this.renderField('country', 'Country')}
				{this.renderField('place_id', 'Place Id')}
				{this.renderField('geo', 'Coordinates')}
			</div>
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
				label: <a href={`https://www.google.com/maps/place/?q=place_id:${value.place_id}`} target="_blank">{value.formatted}</a>,
				value: value.formatted
			};
		}

		// const arrowToggle = this.collapsed && defaultValue ? <span className="octicon octicon-plus"></span> : null;
		return (
			<Select.Async
				arrowRenderer={null}
				loadOptions={this.getPredictions}
				name={this.getInputName(`${path}.formatted`)}
				onChange={this.onPlaceChosen}
				placeholder="Type the address ..."
				value={defaultValue}
				simpleValue
			/>
		);
	},

	renderLinks () {
		const { inputMode, collapsed } = this.state;
		let switchTo = null;

		if (inputMode === 'manual') {
			switchTo = (
				<span style={{ marginLeft: '1em' }}>
					<CollapsedFieldLabel onClick={this.toggleInputMode}>
						Use Autocomplete
					</CollapsedFieldLabel>
				</span>
			);
		}

		let showAll = null;
		if (collapsed) {
			return (
				<span style={{ marginLeft: '1em' }}>
					<CollapsedFieldLabel onClick={this.toggleCollapsed}>
						Show All Fields
					</CollapsedFieldLabel>
				</span>
			);
		}

		return (
			<div style={{ display: 'inline-block' }}>
				{switchTo}
				{showAll}
			</div>
		);
	},

	renderUI () {
		const { label, path } = this.props;
		this.firstWithErrorsFocused = false;
		if (!this.shouldRenderField()) {
			return (
				<div>
					<FormField label={this.props.label}>{this.renderValue()}</FormField>
				</div>
			);
		}

		//
		return (
			<div data-field-name={path} data-field-type="location">
				<div id="carengo-map"/>
				<FormField label={label} htmlFor={path}>
					{this.renderAutocompleteInput()}
					{this.renderAddressFields()}
				</FormField>
				{this.renderNote()}
			</div>
		);
	},
});
