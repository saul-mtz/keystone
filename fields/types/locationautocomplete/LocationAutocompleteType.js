var _ = require('lodash');
var FieldType = require('../Type');
var keystone = require('../../../');
var util = require('util');
var utils = require('keystone-utils');

const addressComponents = [
	'street_name',
	'street_number',
	'sublocality',
	'locality',
	'state',
	'postal_code',
	'country',
	'place_id',
	'geo',
	'formatted',
];

/**
 * Location FieldType Constructor
 */
function locationautocomplete (list, path, options) {

	this._underscoreMethods = ['format'];
	this._fixedSize = 'full';
	if (!keystone.get('google server api key')) {
		throw new Error('"google server api key" value is not set');
	}

	if (!options.defaults) {
		options.defaults = {};
	}

	if (options.required) {
		if (Array.isArray(options.required)) {
			// required can be specified as an array of paths
			this.requiredPaths = options.required;
			options.required = this.requiredPaths;
		} else if (typeof options.required === 'string') {
			// or it can be specified as a comma-delimited list
			this.requiredPaths = options.required.replace(/,/g, ' ').split(/\s+/);
			options.required = this.requiredPaths;
		} else {
			// default this.requiredPaths
			this.requiredPaths = ['street_name', 'street_number', 'postal_code'];
			options.required = this.requiredPaths;
		}
	}

	locationautocomplete.super_.call(this, list, path, options);
}

locationautocomplete.properName = 'LocationAutocomplete';
util.inherits(locationautocomplete, FieldType);

/**
 * Registers the field on the List's Mongoose Schema.
 */
locationautocomplete.prototype.addToSchema = function (schema) {
	var field = this;
	var options = this.options;

	var paths = this.paths = {};
	addressComponents.forEach(component => {
		paths[component] = `${this.path}.${component}`;
	});

	var getFieldDef = function (type, key) {
		var def = { type: type };
		if (options.defaults[key]) {
			def.default = options.defaults[key];
		}
		return def;
	};

	schema.nested[this.path] = true;

	const toAdd = {};

	addressComponents.forEach(component => {
		toAdd[component] = getFieldDef(String, component);
	});

	toAdd.geo = { type: [Number], index: '2dsphere' };

	schema.add(toAdd, `${this.path}.`);

	// pre-save hook to fix blank geo fields
	// see http://stackoverflow.com/questions/16388836/does-applying-a-2dsphere-index-on-a-mongoose-schema-force-the-location-field-to
	schema.pre('save', function (next) {
		var obj = field._path.get(this);
		var geo = (obj.geo || []).map(Number).filter(_.isFinite);
		obj.geo = (geo.length === 2) ? geo : undefined;
		next();
	});

	this.bindUnderscoreMethods();
};

locationautocomplete.prototype.addFilterToQuery = function (filter) {
	var query = {};
	var field = this;
	var filterPathMap = [
		'street_name',
		'sublocality',
		'locality',
		'state',
		'postal_code',
	];

	filterPathMap.forEach(function (i) {
		if (!filter[i]) return;
		var value = utils.escapeRegExp(filter[i]);
		value = new RegExp(value, 'i');
		query[field.paths[filterPathMap[i]]] = filter.inverted ? { $not: value } : value;
	});
	return query;
};

/**
 * Formats a list of the values stored by the field. Only paths that
 * have values will be included.
 *
 * Optionally provide a space-separated list of values to include.
 *
 * Delimiter defaults to `', '`.
 */
locationautocomplete.prototype.format = function (item, values, delimiter) {
	if (!values) {
		throw new Error('check this');
		// return item.get(this.paths.serialised);
	}
	var paths = this.paths;
	values = values.split(' ').map(function (i) {
		return item.get(paths[i]);
	});
	return _.compact(values).join(delimiter || ', ');
};

/**
 * Detects whether the field has been modified
 */
locationautocomplete.prototype.isModified = function (item) {
	return item.isModified(this.paths.number)
	|| item.isModified(this.paths.name)
	|| item.isModified(this.paths.street)
	|| item.isModified(this.paths.suburb)
	|| item.isModified(this.paths.state)
	|| item.isModified(this.paths.postal_code)
	|| item.isModified(this.paths.country)
	|| item.isModified(this.paths.geo);
};

locationautocomplete.prototype.getInputFromData = function (data) {
	const values = {};
	addressComponents.forEach(component => {
		const key = this.paths[component];

		if (data[key]) {
			values[key] = data[key];
		}
	});

	const pathGeo = this.paths.geo;
	if (values[pathGeo]) {
		values[pathGeo] = values[pathGeo].split(',');
	}

	return values;
};

/**
 * Validates that input has been provided
 * TODO: Needs test coverage
 */
locationautocomplete.prototype.validateRequiredInput = function (item, data, callback) {
	let result = true;
	const errors = [];
	const input = this.getInputFromData(data);

	const currentFormatted = item.get(this.paths.formatted);
	const newFormatted = input[this.paths.formatted];

	if (!newFormatted) {
		// will use the fallback message
		result = false;
	} else if (currentFormatted !== newFormatted) {
		this.requiredPaths.forEach((path) => {
			const key = `${this.path}.${path}`;
			// falsy values mean the input is invalid
			if (!input[key]) {
				result = false;
				errors.push(`${path} is mandatory`);
			}
		});
	}

	utils.defer(callback, result, errors.length > 0 ? `${this.label}: ${errors.join(', ')}` : undefined);
};

/**
 * Updates the value for this field in the item from a data object
 */
locationautocomplete.prototype.updateItem = function (item, data, callback) {
	const values = this.getInputFromData(data);

	// rely (too much) on the formatted address,
	// which is used as a serialized value for the whole address
	const currentFormatted = item.get(this.paths.formatted);
	const newFormatted = values[this.paths.formatted];

	if (currentFormatted !== newFormatted) {
		item.set(this.path, undefined); // delete all the current data
		Object.keys(values).forEach(path => {
			item.set(path, values[path]);
		});
	}

	process.nextTick(callback);
};

/* Export Field Type */
module.exports = locationautocomplete;
