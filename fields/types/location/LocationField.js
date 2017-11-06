import _ from 'lodash';
import React from 'react';
import Field from '../Field';
import CollapsedFieldLabel from '../../components/CollapsedFieldLabel';
import NestedFormField from '../../components/NestedFormField';
import CollapsedFieldLabel from '../../components/CollapsedFieldLabel';
import Select from 'react-select';


import {
	Button,
	FormField,
	FormInput,
	FormNote,
	Grid,
	LabelledControl,
} from '../../../admin/client/App/elemental';

var querystring = require('querystring');

function doGoogleGeocodeRequest(address, components, region, callback) {

	// https://developers.google.com/maps/documentation/geocoding/
	// Use of the Google Geocoding API is subject to a query limit of 2,500 geolocation requests per day, except with an enterprise license.
	// Note: the Geocoding API may only be used in conjunction with a Google map; geocoding results without displaying them on a map is prohibited.
	// Please make sure your Keystone app complies with the Google Maps API License.

	var options = {
		sensor: false,
		language: 'es',
		address,
		components,
	};

	if (arguments.length === 2 && typeof region === 'function') {
		callback = region;
		region = null;
	}

	if (region) {
		options.region = region;
	}

	const key = process.env.GOOGLE_SERVER_KEY;
	if (key) {
		options.key = key;
	}

	var endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?' + querystring.stringify(options);

	https.get(endpoint, function (res) {
		var data = [];
		res.on('data', function (chunk) {
			data.push(chunk);
		})
			.on('end', function () {
				var dataBuff = data.join('').trim();
				var result;
				try {
					result = JSON.parse(dataBuff);
				}
				catch (exp) {
					result = {
						status_code: 500,
						status_text: 'JSON Parse Failed',
						status: 'UNKNOWN_ERROR',
					};
				}
				callback(null, result);
			});
	})
		.on('error', function (err) {
			callback(err);
		});
}

/**
 * TODO:
 * - Remove dependency on underscore
 * - Custom path support
 */

module.exports = Field.create({

	displayName: 'LocationField',
	statics: {
		type: 'Location',
	},

	getInitialState() {
		return {
			improve: true,
			overwrite: true,
			collapsed: true,
		};
	},

	componentWillMount () {
		const { value = [] } = this.props;
		var collapsedFields = {};
		_.forEach(['number', 'name', 'street2', 'geo'], (i) => {
			if (!value[i]) {
				collapsedFields[i] = true;
			}
		}, this);
		this.setState({ collapsedFields });
	},

	shouldCollapse () {
		return this.props.collapse && !this.formatValue();
	},

	uncollapseFields () {
		this.setState({
			collapsedFields: {},
		});
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
		return _.compact([
			value.number,
			value.name,
			value.street1,
			value.street2,
			value.suburb,
			value.state,
			value.postcode,
			value.country,
		]).join(', ');
	},

	renderValue () {
		return <FormInput noedit>{this.formatValue() || ''}</FormInput>;
	},

	renderField (fieldPath, label, collapse, autoFocus) {
		if (this.state.collapsedFields[fieldPath]) {
			return null;
		}
		const { value = {}, path } = this.props;
		return (
			<NestedFormField label={label} data-field-location-path={path + '.' + fieldPath}>
				<FormInput
					autoFocus={autoFocus}
					name={this.getInputName(path + '.' + fieldPath)}
					onChange={this.makeChanger(fieldPath)}
					placeholder={label}
					value={value[fieldPath] || ''}
				/>
			</NestedFormField>
		);
	},

	renderSuburbState () {
		const { value = {}, path } = this.props;
		return (
			<NestedFormField label="Suburb / State" data-field-location-path={path + '.suburb_state'}>
				<Grid.Row gutter={10}>
					<Grid.Col small="two-thirds" data-field-location-path={path + '.suburb'}>
						<FormInput
							name={this.getInputName(path + '.suburb')}
							onChange={this.makeChanger('suburb')}
							placeholder="Suburb"
							value={value.suburb || ''}
						/>
					</Grid.Col>
					<Grid.Col small="one-third" data-field-location-path={path + '.state'}>
						<FormInput
							name={this.getInputName(path + '.state')}
							onChange={this.makeChanger('state')}
							placeholder="State"
							value={value.state || ''}
						/>
					</Grid.Col>
				</Grid.Row>
			</NestedFormField>
		);
	},

	renderPostcodeCountry () {
		const { value = {}, path } = this.props;
		return (
			<NestedFormField label="Postcode / Country" data-field-location-path={path + '.postcode_country'}>
				<Grid.Row gutter={10}>
					<Grid.Col small="one-third" data-field-location-path={path + '.postcode'}>
						<FormInput
							name={this.getInputName(path + '.postcode')}
							onChange={this.makeChanger('postcode')}
							placeholder="Post Code"
							value={value.postcode || ''}
						/>
					</Grid.Col>
					<Grid.Col small="two-thirds" data-field-location-path={path + '.country'}>
						<FormInput
							name={this.getInputName(path + '.country')}
							onChange={this.makeChanger('country')}
							placeholder="Country"
							value={value.country || ''}
						/>
					</Grid.Col>
				</Grid.Row>
			</NestedFormField>
		);
	},

	renderNote () {
		const { note } = this.props;
		if (!note) return null;
		return (
			<FormField offsetAbsentLabel>
				<FormNote note={note} />
			</FormField>
		);
	},

	toggleCollapsed() {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	},

	getPredictions(input, callback) {
		if (!input || 'string' !== typeof input || input.length < 3) {
			return callback(null, []);
		}

		// function doGoogleGeocodeRequest(address, components, region, callback) {
		debugger;
		doGoogleGeocodeRequest(input, {}, 'MX', (error, result) => {
			callback(err, result);
		})
	},

	renderUI () {

		if (!this.shouldRenderField()) {
			return (
				<FormField label={this.props.label}>{this.renderValue()}</FormField>
			);
		}
		const { label, path } = this.props;
		console.log('this', this);

		if (this.state.collapsed) {
			return (
				<div data-field-name={path} data-field-type="location">
					<FormField label={label} htmlFor={path}>
						<Grid.Row gutter={10}>
							<Grid.Col small="four-fifths">
								<Select.Async
									loadOptions={this.getPredictions}
									name={this.getInputName(this.props.path)}
									onChange={this.valueChanged}
									simpleValue
									valueKey="id"
								/>
							</Grid.Col>
							<Grid.Col small="one-fifth">
								<CollapsedFieldLabel onClick={this.toggleCollapsed}>
									Enter Manually
								</CollapsedFieldLabel>
							</Grid.Col>
						</Grid.Row>
					</FormField>
					{this.renderNote()}
				</div>
			);
		} else {
			return (
				<div data-field-name={path} data-field-type="location">
					<FormField label={label} htmlFor={path}>
						<span style={{marginLeft: '1em' }}>
							<CollapsedFieldLabel onClick={this.toggleCollapsed}>
								Use Autocomplete
							</CollapsedFieldLabel>
						</span>
						<div style={{ border: 'solid 1px #ccc', padding: '0.4rem 0.6rem', borderRadius: '0.3rem' }}>
							{this.renderField('street_address', 'Street Address', true)}
							{this.renderField('neighborhood', 'Colonia')}
							{this.renderMunicipalityState()}
							{this.renderPostcodeCountry()}
							{this.renderGeo()}
						</div>
					</FormField>
					{this.renderNote()}
				</div>
			);
		}
	},

});
