'use strict';

var _ArrayField = require('../../mixins/ArrayField');

var _ArrayField2 = _interopRequireDefault(_ArrayField);

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD';
const DEFAULT_FORMAT_STRING = 'Do MMM YYYY';

module.exports = _Field2.default.create({

	displayName: 'DateArrayField',
	statics: {
		type: 'DateArray'
	},
	mixins: [_ArrayField2.default],

	propTypes: {
		formatString: _react2.default.PropTypes.string,
		inputFormat: _react2.default.PropTypes.string
	},

	getDefaultProps() {
		return {
			formatString: DEFAULT_FORMAT_STRING,
			inputFormat: DEFAULT_INPUT_FORMAT
		};
	},

	processInputValue(value) {
		if (!value) return;
		const m = (0, _moment2.default)(value);
		return m.isValid() ? m.format(this.props.inputFormat) : value;
	},

	formatValue(value) {
		return value ? (0, _moment2.default)(value).format(this.props.formatString) : '';
	},

	getInputComponent() {
		return _DateInput2.default;
	}

});