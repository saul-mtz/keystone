'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getRelatedIconClass = require('../utils/getRelatedIconClass');

var _getRelatedIconClass2 = _interopRequireDefault(_getRelatedIconClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Section extends _react2.default.Component {
	render() {
		const iconClass = this.props.icon || (0, _getRelatedIconClass2.default)(this.props.id);
		return _react2.default.createElement(
			'div',
			{ className: 'dashboard-group', 'data-section-label': this.props.label },
			_react2.default.createElement(
				'div',
				{ className: 'dashboard-group__heading' },
				_react2.default.createElement('span', { className: `dashboard-group__heading-icon ${iconClass}` }),
				this.props.label
			),
			this.props.children
		);
	}
}

Section.propTypes = {
	children: _react2.default.PropTypes.element.isRequired,
	icon: _react2.default.PropTypes.string,
	id: _react2.default.PropTypes.string,
	label: _react2.default.PropTypes.string.isRequired
};

exports.default = Section;