'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.securityDepositDefault = exports.costPerKmExtra = exports.calculate = exports.init = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Init the variabled needed to calculate a rent price
 */
const init = exports.init = ({
	discount,
	extraKm,
	pricePerDay,
	pickupDate,
	returnDate,
	securityDeposit }) => {

	if (!pickupDate || !returnDate) {
		throw new Error('pickupDate and returnDate are mandatory');
	}

	const momentPickupDate = (0, _moment2.default)(pickupDate);
	const momentReturnDate = (0, _moment2.default)(returnDate);

	if (momentPickupDate.isAfter(momentReturnDate)) {
		throw new Error('pickupDate must be before returnDate');
	} else if (momentPickupDate.isSame(momentReturnDate)) {
		throw new Error('pickupDate and returnDate cannot be the same');
	}

	const grace = { hours: 23, minutes: 59 };
	// https://momentjs.com/docs/#/displaying/difference/
	const rentDays = momentReturnDate.diff(momentPickupDate.subtract(grace, 'minutes'), 'days');

	return {
		discount: undefined !== discount ? discount : 0,
		extraKm: undefined !== extraKm ? extraKm : 0,
		pricePerDay: undefined !== pricePerDay ? pricePerDay : 0,
		rentDays,
		securityDeposit: undefined !== securityDeposit ? securityDeposit : securityDepositDefault
	};
};

const calculate = exports.calculate = ({
	pricePerDay,
	pickUpDate,
	returnDate }) => {

	const example = {
		total: 650,
		iva: 104,
		subtotal: 546,
		displayItems: [{
			label: 'Price/day x 4 days',
			amount: 15.0
		}]
	};

	return 0;
};

const costPerKmExtra = exports.costPerKmExtra = 3;

const securityDepositDefault = exports.securityDepositDefault = 2500;