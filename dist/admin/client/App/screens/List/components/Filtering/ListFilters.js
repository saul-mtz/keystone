'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../../elemental');

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ListFilters = ({ dispatch, filters }) => {

	if (!filters.length) return _react2.default.createElement('div', null);

	const dispatchClearAllFilters = function () {
		dispatch((0, _actions.clearAllFilters)());
	};

	// Generate the list of filter pills
	const currentFilters = filters.map((filter, i) => _react2.default.createElement(_Filter2.default, {
		key: 'f' + i,
		filter: filter,
		dispatch: dispatch
	}));

	// When more than 1, append the clear button
	if (currentFilters.length > 1) {
		currentFilters.push(_react2.default.createElement(_elemental.Chip, {
			key: 'listFilters__clear',
			label: 'Clear All',
			onClick: dispatchClearAllFilters
		}));
	}

	const styles = {
		marginBottom: '1em',
		marginTop: '1em'
	};

	return _react2.default.createElement(
		'div',
		{ style: styles },
		currentFilters
	);
};

ListFilters.propTypes = {
	dispatch: _react.PropTypes.func.isRequired,
	filters: _react.PropTypes.array.isRequired
};

module.exports = ListFilters;