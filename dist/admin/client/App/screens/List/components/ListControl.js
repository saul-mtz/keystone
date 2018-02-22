'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListControl = _react2.default.createClass({
	displayName: 'ListControl',

	propTypes: {
		dragSource: _react2.default.PropTypes.func,
		onClick: _react2.default.PropTypes.func,
		type: _react2.default.PropTypes.oneOf(['check', 'delete', 'sortable']).isRequired
	},
	renderControl() {
		var icon = 'octicon octicon-';
		var className = (0, _classnames2.default)('ItemList__control ItemList__control--' + this.props.type, {
			'is-active': this.props.active
		});
		var tabindex = this.props.type === 'sortable' ? -1 : null;

		if (this.props.type === 'check') {
			icon += 'check';
		}
		if (this.props.type === 'delete') {
			icon += 'trashcan';
		}
		if (this.props.type === 'sortable') {
			icon += 'three-bars';
		}

		var renderButton = _react2.default.createElement(
			'button',
			{ type: 'button', onClick: this.props.onClick, className: className, tabIndex: tabindex },
			_react2.default.createElement('span', { className: icon })
		);
		if (this.props.dragSource) {
			return this.props.dragSource(renderButton);
		} else {
			return renderButton;
		}
	},
	render() {
		var className = 'ItemList__col--control ItemList__col--' + this.props.type;

		return _react2.default.createElement(
			'td',
			{ className: className },
			this.renderControl()
		);
	}
});

module.exports = ListControl;