'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DrilldownItem = require('./DrilldownItem');

var _DrilldownItem2 = _interopRequireDefault(_DrilldownItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Drilldown(_ref) {
	let { className, items } = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'items']);

	props.className = (0, _noImportant.css)(classes.drilldown, className);

	return _react2.default.createElement(
		'ul',
		props,
		items.map((item, idx) => _react2.default.createElement(_DrilldownItem2.default, {
			href: item.href,
			key: idx,
			label: item.label,
			separate: idx < items.length - 1
		}))
	);
};

Drilldown.propTypes = {
	items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		href: _react.PropTypes.string.isRequired,
		label: _react.PropTypes.string.isRequired,
		separate: _react.PropTypes.bool })).isRequired
};

const classes = _noImportant.StyleSheet.create({
	drilldown: {
		display: 'inline-block',
		listStyle: 'none',
		margin: 0,
		padding: 0
	}
});

module.exports = Drilldown;