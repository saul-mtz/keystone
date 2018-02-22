'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadCounts = loadCounts;
exports.countsLoaded = countsLoaded;
exports.countsLoadingError = countsLoadingError;

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _constants = require('./constants');

var _constants2 = require('../../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load the counts of all lists
 */
function loadCounts() {
	return dispatch => {
		dispatch({
			type: _constants.LOAD_COUNTS
		});
		(0, _xhr2.default)({
			url: `${Keystone.adminPath}/api/counts`
		}, (err, resp, body) => {
			if (err) {
				dispatch(countsLoadingError(err));
				return;
			}
			try {
				body = JSON.parse(body);
				if (body.counts) {
					dispatch(countsLoaded(body.counts));
				}
			} catch (e) {
				console.log('Error parsing results json:', e, body);
				dispatch(countsLoadingError(e));
				return;
			}
		});
	};
}

/**
 * Dispatched when the counts were loaded
 *
 * @param  {Object} counts The counts object as returned by the API
 */
function countsLoaded(counts) {
	return {
		type: _constants.COUNTS_LOADING_SUCCESS,
		counts
	};
}

/**
 * Dispatched when unsuccessfully trying to load the counts, will redispatch
 * loadCounts after NETWORK_ERROR_RETRY_DELAY until we get counts back
 *
 * @param  {object} error The error
 */
function countsLoadingError(error) {
	return (dispatch, getState) => {
		dispatch({
			type: _constants.COUNTS_LOADING_ERROR,
			error
		});
		setTimeout(() => {
			dispatch(loadCounts());
		}, _constants2.NETWORK_ERROR_RETRY_DELAY);
	};
}