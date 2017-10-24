import _ from 'lodash';
import React from 'react';
import Field from '../Field';
import NestedFormField from '../../components/NestedFormField';

import {
	FormField,
	FormInput,
	FormNote,
	Grid,
	LabelledControl,
} from '../../../admin/client/App/elemental';

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

	getInitialState () {
		return {
			improve: true,
			overwrite: true,
		};
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

	geoChanged (i, event) {
		const { value = {}, path, onChange } = this.props;
		const newVal = event.target.value;
		const geo = [
			i === 0 ? newVal : value.geo ? value.geo[0] : '',
			i === 1 ? newVal : value.geo ? value.geo[1] : '',
		];
		onChange({
			path,
			value: {
				...value,
				geo,
			},
		});
	},

	makeGeoChanger (fieldPath) {
		return this.geoChanged.bind(this, fieldPath);
	},

	formatValue () {
		const { value = {} } = this.props;
		return _.compact([
			value.street_address,
			value.neighborhood,
			value.municipality,
			value.state,
			value.postcode,
			value.country,
		]).join(', ');
	},

	renderValue () {
		return <FormInput noedit>{this.formatValue() || ''}</FormInput>;
	},

	renderField (fieldPath, label, autoFocus) {
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

	renderMunicipalityState() {
		const { value = {}, path } = this.props;
		return (
			<NestedFormField label="Delegación o Municipio / Estado" data-field-location-path={path + '.municipality_state'}>
				<Grid.Row gutter={10}>
					<Grid.Col small="two-thirds" data-field-location-path={path + '.municipality'}>
						<FormInput
							name={this.getInputName(path + '.municipality')}
							onChange={this.makeChanger('municipality')}
							placeholder="Suburb"
							value={value.municipality || ''}
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

	renderGeo () {
		const { value = {}, path, paths } = this.props;
		const geo = value.geo || [];

		if (geo === []) {
			return null;
		}

		return (
			<NestedFormField label="Lat / Lng" data-field-location-path={path + '.geo'}>
				<Grid.Row gutter={10}>
					<Grid.Col small="one-half" data-field-location-path="latitude">
						<FormInput
							name={this.getInputName(paths.geo + '[1]')}
							disabled
							onChange={this.makeGeoChanger(1)}
							placeholder="Latitude"
							value={geo[1] || ''}
						/>
					</Grid.Col>
					<Grid.Col small="one-half" data-field-location-path="longitude">
						<FormInput
							name={this.getInputName(paths.geo + '[0]')}
							disabled
							onChange={this.makeGeoChanger(0)}
							placeholder="Longitude"
							value={geo[0] || ''}
						/>
					</Grid.Col>
				</Grid.Row>
			</NestedFormField>
		);
	},

	updateGoogleOption (key, e) {
		var newState = {};
		newState[key] = e.target.checked;
		this.setState(newState);
	},

	makeGoogler (key) {
		return this.updateGoogleOption.bind(this, key);
	},


	renderGoogleOptions () {
		const { paths, enableMapsAPI } = this.props;
		if (!enableMapsAPI) return null;
		var replace = this.state.improve ? (
			<LabelledControl
				checked={this.state.overwrite}
				label="Replace existing data"
				name={this.getInputName(paths.overwrite)}
				onChange={this.makeGoogler('overwrite')}
				type="checkbox"
			/>
		) : null;
		return (
			<FormField offsetAbsentLabel>
				<LabelledControl
					checked={this.state.improve}
					label="Autodetect and improve location on save"
					name={this.getInputName(paths.improve)}
					onChange={this.makeGoogler('improve')}
					title="When checked, this will attempt to fill missing fields. It will also get the lat/long"
					type="checkbox"
				/>
				{replace}
			</FormField>
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

	renderUI () {
		if (!this.shouldRenderField()) {
			return (
				<FormField label={this.props.label}>{this.renderValue()}</FormField>
			);
		}

		const { label, path } = this.props;
		return (
			<div data-field-name={path} data-field-type="location">
				{this.renderField('street_address', 'Street Address', true)}
				{this.renderField('neighborhood', 'Colonia')}
				{this.renderMunicipalityState()}
				{this.renderPostcodeCountry()}
				{this.renderGeo()}
				{this.renderGoogleOptions()}
				{this.renderNote()}
			</div>
		);
	},

});
