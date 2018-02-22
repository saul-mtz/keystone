'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Using window.innerWidth and state instead of CSS media breakpoints
// because we want to render null rather than an empty span. Allowing for
// CSS pseudo classes like :only-child to behave as expected.

// Return true if window + document
const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

class ResponsiveText extends _react.Component {
	constructor() {
		super();
		this.handleResize = this.handleResize.bind(this);
		this.state = {
			windowWidth: canUseDOM ? window.innerWidth : 0
		};
	}
	componentDidMount() {
		if (canUseDOM) {
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		}
	}
	componentWillUnmount() {
		if (canUseDOM) {
			window.removeEventListener('resize', this.handleResize);
		}
	}
	handleResize() {
		this.setState({
			windowWidth: canUseDOM ? window.innerWidth : 0
		});
	}
	render() {
		const _props = this.props,
		      {
			component: Component,
			hiddenLG,
			hiddenMD,
			hiddenSM,
			hiddenXS,
			visibleLG,
			visibleMD,
			visibleSM,
			visibleXS
		} = _props,
		      props = _objectWithoutProperties(_props, ['component', 'hiddenLG', 'hiddenMD', 'hiddenSM', 'hiddenXS', 'visibleLG', 'visibleMD', 'visibleSM', 'visibleXS']);
		const { windowWidth } = this.state;

		let text;

		// set text value from breakpoint; attempt XS --> LG
		if (windowWidth < _theme2.default.breakpointNumeric.mobile) {
			text = visibleXS || hiddenSM || hiddenMD || hiddenLG;
		} else if (windowWidth < _theme2.default.breakpointNumeric.tabletPortrait) {
			text = hiddenXS || visibleSM || hiddenMD || hiddenLG;
		} else if (windowWidth < _theme2.default.breakpointNumeric.tabletLandscape) {
			text = hiddenXS || hiddenSM || visibleMD || hiddenLG;
		} else {
			text = hiddenXS || hiddenSM || hiddenMD || visibleLG;
		}

		return text ? _react2.default.createElement(
			Component,
			props,
			text
		) : null;
	}
};

ResponsiveText.propTypes = {
	hiddenLG: _react.PropTypes.string,
	hiddenMD: _react.PropTypes.string,
	hiddenSM: _react.PropTypes.string,
	hiddenXS: _react.PropTypes.string,
	visibleLG: _react.PropTypes.string,
	visibleMD: _react.PropTypes.string,
	visibleSM: _react.PropTypes.string,
	visibleXS: _react.PropTypes.string
};
ResponsiveText.defaultProps = {
	component: 'span'
};

module.exports = ResponsiveText;