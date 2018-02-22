'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE: only accepts InlineGroupSection as a single child

function InlineGroup(_ref) {
	let {
		aphroditeStyles,
		block,
		children,
		className,
		component: Component,
		contiguous
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'block', 'children', 'className', 'component', 'contiguous']);

	// prepare group className
	props.className = (0, _noImportant.css)(classes.group, !!block && classes.block, aphroditeStyles);
	if (className) {
		props.className += ' ' + className;
	}

	// convert children to an array and filter out falsey values
	const buttons = _react.Children.toArray(children).filter(i => i);

	// normalize the count
	const count = buttons.length - 1;

	// clone children and apply classNames that aphrodite can target
	props.children = buttons.map((c, idx) => {
		if (!c) return null;

		const isOnlyChild = !count;
		const isFirstChild = !isOnlyChild && idx === 0;
		const isLastChild = !isOnlyChild && idx === count;
		const isMiddleChild = !isOnlyChild && !isFirstChild && !isLastChild;

		let position;
		if (isOnlyChild) position = 'only';
		if (isFirstChild) position = 'first';
		if (isLastChild) position = 'last';
		if (isMiddleChild) position = 'middle';

		return (0, _react.cloneElement)(c, {
			contiguous: contiguous,
			position
		});
	});

	return _react2.default.createElement(Component, props);
};

InlineGroup.propTypes = {
	aphroditeStyles: _react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	}),
	block: _react.PropTypes.bool,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	contiguous: _react.PropTypes.bool
};
InlineGroup.defaultProps = {
	component: 'div'
};

const classes = _noImportant.StyleSheet.create({
	group: {
		display: 'inline-flex'
	},
	block: {
		display: 'flex'
	}
});

module.exports = InlineGroup;