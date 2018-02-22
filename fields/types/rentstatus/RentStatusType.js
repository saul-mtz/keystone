var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');

/**
 * Select FieldType Constructor
 * @extends Field
 * @api public
 */
function rentstatus (list, path, options) {
	this.ui = options.ui || 'select';
	this.numeric = options.numeric ? true : false;
	this._nativeType = (options.numeric) ? Number : String;
	this._underscoreMethods = ['format'];
	this._properties = ['ops', 'numeric'];
	if (typeof options.options === 'string') {
		options.options = options.options.split(',');
	}
	rentstatus.super_.call(this, list, path, options);
}

rentstatus.properName = 'RentStatus';
util.inherits(rentstatus, FieldType);

const fnFieldTypeGetOptions = FieldType.prototype.getOptions;

/**
 * Pass this extra options to the Admin UI
 * @returns {{stateMachine: {config}} & any}
 */
rentstatus.prototype.getOptions = function () {
	const stateMachine = { config: this.options.config };
	return Object.assign({ stateMachine }, fnFieldTypeGetOptions.call(this));
};

/**
 * Registers the field on the List's Mongoose Schema.
 */
rentstatus.prototype.addToSchema = function (schema) {
	schema.path(this.path, { type: String });
	this.bindUnderscoreMethods();
};

/**
 * Add filters to a query
 */
rentstatus.prototype.addFilterToQuery = function (filter) {
	var query = {};
	if (!Array.isArray(filter.value)) {
		if (filter.value) {
			filter.value = [filter.value];
		} else {
			filter.value = [];
		}
	}
	if (filter.value.length > 1) {
		query[this.path] = (filter.inverted) ? { $nin: filter.value } : { $in: filter.value };
	} else if (filter.value.length === 1) {
		query[this.path] = (filter.inverted) ? { $ne: filter.value[0] } : filter.value[0];
	} else {
		query[this.path] = (filter.inverted) ? { $nin: ['', null] } : { $in: ['', null] };
	}
	return query;
};

/**
 * Asynchronously confirms that the provided value is valid
 */
rentstatus.prototype.validateInput = function (data, callback) {
	const valueRaw = this.getValueFromData(data);
	let isValid = true;
	if (valueRaw && typeof valueRaw === 'string' && valueRaw[0] === '{') {
		const parsed = JSON.parse(valueRaw);
		isValid = typeof parsed === 'object' && parsed.event && typeof parsed.event === 'object';
	}

	utils.defer(callback, isValid);
};

/**
 * Formats the field value
 */
rentstatus.prototype.format = function (item) {
	return this.labels[item.get(this.path)] || '';
};

/**
 * Updates the value for this field in the item from a data object
 */
rentstatus.prototype.updateItem = function (item, data, callback) {
	item.set(this.path, this.getValueFromData(data));
	process.nextTick(callback);
};

/* Export Field Type */
module.exports = rentstatus;
