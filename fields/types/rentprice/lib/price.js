import moment from 'moment';

/**
 * Init the variabled needed to calculate a rent price
 */
export const init = ({
	discount,
	extraKm,
	pricePerDay,
	pickupDate,
	returnDate,
	securityDeposit }) => {

	if (!pickupDate || !returnDate) {
		throw new Error('pickupDate and returnDate are mandatory');
	}

	const momentPickupDate = moment(pickupDate);
	const momentReturnDate = moment(returnDate);

	if (momentPickupDate.isAfter(momentReturnDate)) {
		throw new Error('pickupDate must be before returnDate');
	} else if (momentPickupDate.isSame(momentReturnDate)) {
		throw new Error('pickupDate and returnDate cannot be the same');
	}

	const grace = {hours: 23, minutes: 59};
	// https://momentjs.com/docs/#/displaying/difference/
	const rentDays = momentReturnDate.diff(momentPickupDate.subtract(grace, 'minutes'), 'days');

	return {
		discount: undefined !== discount ? discount : 0,
		extraKm: undefined !== extraKm ? extraKm : 0,
		pricePerDay: undefined !== pricePerDay ? pricePerDay : 0,
		rentDays,
		securityDeposit: undefined !== securityDeposit ? securityDeposit : securityDepositDefault,
	}
};

export const calculate = ({
	pricePerDay,
	pickUpDate,
	returnDate }) => {

	const example = {
		total: 650,
		iva: 104,
		subtotal: 546,
		displayItems: [{
			label: 'Price/day x 4 days',
			amount: 15.0,
		}],
	};

	return 0;
};

export const costPerKmExtra = 3;

export const securityDepositDefault = 2500;
