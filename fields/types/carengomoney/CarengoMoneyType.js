import { format as formatPrice } from './lib';

const FieldType = require('../Type');
const NumberType = require('../number/NumberType');
const util = require('util');
const utils = require('keystone-utils');

const fnFieldTypeGetOptions = FieldType.prototype.getOptions;

const keystone = require('../../../');
const currency = keystone.get('currency');
const locale = keystone.get('locale');

/**
 * Money FieldType Constructor
 * @extends Field
 * @api public
 */
function carengomoney (list, path, options) {
	this._nativeType = Number;
	this._underscoreMethods = ['format', 'toPesos'];
	this._fixedSize = 'small';

	// update the range values before call the super constructor
	if (options.min) {
		options.min = options.min * 100;
	}
	if (options.max) {
		options.max = options.max * 100;
	}

	carengomoney.super_.call(this, list, path, options);
}

carengomoney.prototype.getOptions = function () {
	return Object.assign({ forceInteger: !!this.options.forceInteger }, fnFieldTypeGetOptions.call(this));
};

carengomoney.properName = 'CarengoMoney';

util.inherits(carengomoney, FieldType);

carengomoney.prototype.validateInput = NumberType.prototype.validateInput;
carengomoney.prototype.validateRequiredInput = NumberType.prototype.validateRequiredInput;
carengomoney.prototype.inputIsValid = NumberType.prototype.inputIsValid;
carengomoney.prototype.addFilterToQuery = NumberType.prototype.addFilterToQuery;

/* Inherit from NumberType prototype */
carengomoney.prototype.updateItem = function (item, data, callback) {
	const value = this.getValueFromData(data);
	if (value === undefined) {
		return process.nextTick(callback);
	}
	var newValue = utils.number(value);
	if (!isNaN(newValue)) {
		if (newValue !== item.get(this.path)) {
			const { forceInteger } = this.options;

			// store the value in cents
			// always store an integer number
			const parsedNewValue = forceInteger ? parseInt(newValue) : newValue.toFixed(2);
			const parsed = parseInt(parsedNewValue * 100);

			item.set(this.path, parsed);
		}
	} else if (typeof item.get(this.path) === 'number') {
		item.set(this.path, null);
	}
	process.nextTick(callback);
};

carengomoney.prototype.getNumber = function (value) {
	const number = utils.number(value);
	return Number.isNaN(number) ? number : number * 100;
}

carengomoney.prototype.getRangeErrorMessage = function (minCents, maxCents) {
	const { forceInteger } = this.options;
	const min = formatPrice(minCents, { forceInteger, currency, locale });
	const max = formatPrice(maxCents, { forceInteger, currency, locale });
	return `"${this.path}" must be greater than ${min} and less than ${max}.`;
};

/**
 * Formats the field value
 */
carengomoney.prototype.format = function (item) {
	const { forceInteger } = this.options;
	const formatOptions = { forceInteger, currency, locale };
	const value = item.get(this.path);
	return formatPrice(value, formatOptions);
};

carengomoney.prototype.toPesos = function (item) {
	const amount = item.get(this.path);
	return Number.isNaN(amount) ? 0 : parseFloat(amount) / 100;
};

/* Export Field Type */
module.exports = carengomoney;
