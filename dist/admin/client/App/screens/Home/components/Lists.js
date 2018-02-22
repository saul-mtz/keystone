'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Lists = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _string = require('../../../../utils/string');

var _ListTile = require('./ListTile');

var _ListTile2 = _interopRequireDefault(_ListTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Lists extends _react2.default.Component {
	render() {
		return _react2.default.createElement(
			'div',
			{ className: 'dashboard-group__lists' },
			_lodash2.default.map(this.props.lists, (list, key) => {
				// If an object is passed in the key is the index,
				// if an array is passed in the key is at list.key
				const listKey = list.key || key;
				const href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
				const listData = this.props.listsData[list.path];
				const isNoCreate = listData ? listData.nocreate : false;
				return _react2.default.createElement(_ListTile2.default, {
					key: list.path,
					path: list.path,
					label: list.label,
					hideCreateButton: isNoCreate,
					href: href,
					count: (0, _string.plural)(this.props.counts[listKey], '* Item', '* Items'),
					spinner: this.props.spinner
				});
			})
		);
	}
}

exports.Lists = Lists;
Lists.propTypes = {
	counts: _react2.default.PropTypes.object.isRequired,
	lists: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
	spinner: _react2.default.PropTypes.node
};

exports.default = (0, _reactRedux.connect)(state => {
	return {
		listsData: state.lists.data
	};
})(Lists);