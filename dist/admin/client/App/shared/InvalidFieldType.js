"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InvalidFieldType = function (props) {
	return _react2.default.createElement(
		"div",
		{ className: "alert alert-danger" },
		"Invalid field type ",
		_react2.default.createElement(
			"strong",
			null,
			props.type
		),
		" at path ",
		_react2.default.createElement(
			"strong",
			null,
			props.path
		)
	);
}; /**
    * Renders an "Invalid Field Type" error
    */

InvalidFieldType.propTypes = {
	path: _react2.default.PropTypes.string,
	type: _react2.default.PropTypes.string
};

module.exports = InvalidFieldType;