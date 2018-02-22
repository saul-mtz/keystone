'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _ListSort = require('./ListSort');

var _ListSort2 = _interopRequireDefault(_ListSort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ListHeaderTitle(_ref) {
	let {
		activeSort,
		availableColumns,
		handleSortSelect,
		title
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['activeSort', 'availableColumns', 'handleSortSelect', 'title']);

	return _react2.default.createElement(
		'h2',
		_extends({ className: (0, _noImportant.css)(classes.heading) }, props),
		title,
		_react2.default.createElement(_ListSort2.default, {
			activeSort: activeSort,
			availableColumns: availableColumns,
			handleSortSelect: handleSortSelect
		})
	);
};

ListHeaderTitle.propTypes = {
	activeSort: _react.PropTypes.object,
	availableColumns: _react.PropTypes.arrayOf(_react.PropTypes.object),
	handleSortSelect: _react.PropTypes.func.isRequired,
	title: _react.PropTypes.string
};

const classes = _noImportant.StyleSheet.create({
	heading: {
		[`@media (max-width: ${_theme2.default.breakpoint.mobileMax})`]: {
			fontSize: '1.25em',
			fontWeight: 500
		}
	}
});

module.exports = ListHeaderTitle;