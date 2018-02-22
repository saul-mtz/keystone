'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

// Pass the Lightbox context through to the Portal's descendents
// StackOverflow discussion http://goo.gl/oclrJ9

class PassContext extends _react.Component {
	getChildContext() {
		return this.props.context;
	}
	render() {
		return _react.Children.only(this.props.children);
	}
};

PassContext.propTypes = {
	context: _react.PropTypes.object.isRequired
};
PassContext.childContextTypes = {
	onClose: _react.PropTypes.func
};

exports.default = PassContext;