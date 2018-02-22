'use strict';

var _ArrayField = require('../../mixins/ArrayField');

var _ArrayField2 = _interopRequireDefault(_ArrayField);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'NumberArrayField',
	statics: {
		type: 'NumberArray'
	},

	mixins: [_ArrayField2.default],

	cleanInput(input) {
		return input.replace(/[^\d]/g, '');
	}

});