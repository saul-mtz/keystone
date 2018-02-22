'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CloudinaryImageSummary = require('../../components/columns/CloudinaryImageSummary');

var _CloudinaryImageSummary2 = _interopRequireDefault(_CloudinaryImageSummary);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const moreIndicatorStyle = {
	color: '#888',
	fontSize: '.8rem'
};

var CloudinaryImagesColumn = _react2.default.createClass({
	displayName: 'CloudinaryImagesColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderMany(value) {
		if (!value || !value.length) return;
		const items = [];
		for (let i = 0; i < 3; i++) {
			if (!value[i]) break;
			items.push(_react2.default.createElement(_CloudinaryImageSummary2.default, { key: 'image' + i, image: value[i] }));
		}
		if (value.length > 3) {
			items.push(_react2.default.createElement(
				'span',
				{ key: 'more', style: moreIndicatorStyle },
				'[...',
				value.length - 3,
				' more]'
			));
		}
		return items;
	},
	renderValue(value) {
		if (!value || !Object.keys(value).length) return;

		return _react2.default.createElement(_CloudinaryImageSummary2.default, { image: value });
	},
	render() {
		const value = this.props.data.fields[this.props.col.path];
		const many = value.length > 1;

		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type },
				many ? this.renderMany(value) : this.renderValue(value[0])
			)
		);
	}
});

module.exports = CloudinaryImagesColumn;