'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
const iva = exports.iva = 0.16;

const formatNumber = exports.formatNumber = (price, forceInteger) => {
	if (Number.isNaN(price) || price === '') {
		return '';
	} else if (forceInteger) {
		return parseInt(price / 100);
	}

	return price / 100;
};

const format = exports.format = (price, options) => {
	if (Number.isNaN(price) || price === '') {
		return '';
	}

	const { forceInteger, currency, locale } = options;

	if (!currency || !locale) {
		throw new Error(`currency ${currency} or locale ${locale} values are not valid`);
	}

	const formatOptions = {
		style: 'currency',
		currency,
		minimumFractionDigits: forceInteger ? 0 : 2,
		maximumFractionDigits: forceInteger ? 0 : 2
	};

	// NOTE: All the prices stored are in cents, that is why /100 is needed
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
	return new Intl.NumberFormat(locale, formatOptions).format(price / 100);
};

module.exports = {
	format,
	formatNumber
};