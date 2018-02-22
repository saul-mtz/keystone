'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used by the Popout component and the Lightbox component of the fields for
 * popouts. Renders a non-react DOM node.
 */

module.exports = _react2.default.createClass({
	displayName: 'Portal',
	portalElement: null, // eslint-disable-line react/sort-comp
	componentDidMount() {
		const el = document.createElement('div');
		document.body.appendChild(el);
		this.portalElement = el;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		_reactDom2.default.render(_react2.default.createElement('div', this.props), this.portalElement);
	},
	getPortalDOMNode() {
		return this.portalElement;
	},
	render() {
		return null;
	}
});