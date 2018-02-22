'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateQueryParams = updateQueryParams;
exports.stringifyColumns = stringifyColumns;
exports.parametizeFilters = parametizeFilters;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Updates the query parameters with the ones passed as the first argument
 *
 * @param  {Object} params         The new parameters to be added
 * @param  {Object} location       The current location object
 */
function updateQueryParams(params, location) {
	if (!location) return;
	const newParams = (0, _objectAssign2.default)({}, location.query);
	// Stringify nested objects inside the parameters
	Object.keys(params).forEach(i => {
		if (params[i]) {
			newParams[i] = params[i];
			if (typeof newParams[i] === 'object') {
				newParams[i] = JSON.stringify(newParams[i]);
			}
		} else {
			delete newParams[i];
		}
	});

	return newParams;
}

/**
 * Stringify the columns array from the state
 *
 * @param  {Array}  columns            The columns from the active state
 * @param  {String} defaultColumnPaths The default column paths of the current list
 *
 * @return {String}                    The column array, stringified
 */
function stringifyColumns(columns, defaultColumnPaths) {
	if (!columns) {
		return;
	}
	// Turns [{ path: 'someColumn' }, { path: 'someOtherColumn' }]
	// into ['someColumn', 'someOtherColumn']
	let columnString = columns.map(column => column.path);
	// Turns that array into 'someColumn,someOtherColumn'
	if (Array.isArray(columnString)) columnString = columnString.join(',');
	// If that is the same as the default columns, don't set the query param
	if (columnString === defaultColumnPaths) columnString = undefined;
	return columnString;
}

/**
 * Flattens filters from state into the minimum needed object to be used as a url
 * param
 *
 * @param  {Object} filterArray         The array of filters from state
 */
function parametizeFilters(filterArray) {
	if (!filterArray || filterArray.length === 0) {
		return;
	}
	return filterArray.map(filter => {
		return Object.assign({
			path: filter.field.path
		}, filter.value);
	});
}