'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GridRow extends _react.Component {
	getChildContext() {
		return {
			gutter: this.props.gutter,
			xsmall: this.props.xsmall,
			small: this.props.small,
			medium: this.props.medium,
			large: this.props.large
		};
	}
	render() {
		const { children, className, gutter, styles = {} } = this.props;

		const componentClassName = `${(0, _noImportant.css)(classes.grid)}${className ? ' ' + className : ''}`;
		const componentStyles = Object.assign(styles, {
			marginLeft: gutter / -2,
			marginRight: gutter / -2
		});

		return _react2.default.createElement(
			'div',
			{ className: componentClassName, style: componentStyles },
			children
		);
	}
};

GridRow.childContextTypes = {
	gutter: _react.PropTypes.number,
	xsmall: _react.PropTypes.string,
	small: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	large: _react.PropTypes.string
};

GridRow.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridRow.defaultProps = {
	gutter: 0,
	xsmall: 'one-whole'
};

const classes = _noImportant.StyleSheet.create({
	grid: {
		display: 'flex',
		flexWrap: 'wrap'
	}
});

module.exports = GridRow;