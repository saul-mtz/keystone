'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _elemental = require('../../../admin/client/App/elemental');

var _PopoutList = require('../../../admin/client/App/shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _Kbd = require('../../../admin/client/App/shared/Kbd');

var _Kbd2 = _interopRequireDefault(_Kbd);

var _bindFunctions = require('../../utils/bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		value: []
	};
}

class FilterOption extends _react.Component {
	constructor() {
		super();

		_bindFunctions2.default.call(this, ['handleClick']);
	}
	handleClick() {
		const { option, selected } = this.props;
		this.props.onClick(option, selected);
	}
	render() {
		const { option, selected } = this.props;
		return _react2.default.createElement(_PopoutList2.default.Item, {
			icon: selected ? 'check' : 'dash',
			isSelected: selected,
			label: option.label,
			onClick: this.handleClick
		});
	}
}

class SelectFilter extends _react.Component {
	constructor() {
		super();

		_bindFunctions2.default.call(this, ['detectOS', 'handleClick', 'handleKeyDown', 'handleKeyUp', 'removeOption', 'selectOption', 'toggleAllOptions', 'toggleInverted', 'updateFilter']);

		this.state = { metaDown: false };
	}
	componentDidMount() {
		this.detectOS();
		document.body.addEventListener('keydown', this.handleKeyDown, false);
		document.body.addEventListener('keyup', this.handleKeyUp, false);
	}
	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.handleKeyDown);
		document.body.removeEventListener('keyup', this.handleKeyUp);
	}

	// ==============================
	// METHODS
	// ==============================

	// TODO this should probably be moved to the main App component and stored
	// in context for other components to subscribe to when required
	detectOS() {
		let osName = 'Unknown OS';

		if (navigator.appVersion.includes('Win')) osName = 'Windows';
		if (navigator.appVersion.includes('Mac')) osName = 'MacOS';
		if (navigator.appVersion.includes('X11')) osName = 'UNIX';
		if (navigator.appVersion.includes('Linux')) osName = 'Linux';

		this.setState({ osName });
	}
	handleKeyDown(e) {
		if (_vkey2.default[e.keyCode] !== '<meta>') return;

		this.setState({ metaDown: true });
	}
	handleKeyUp(e) {
		if (_vkey2.default[e.keyCode] !== '<meta>') return;

		this.setState({ metaDown: false });
	}

	toggleInverted(inverted) {
		this.updateFilter({ inverted });
	}
	toggleAllOptions() {
		const { field, filter } = this.props;

		if (filter.value.length < field.ops.length) {
			this.updateFilter({ value: field.ops.map(i => i.value) });
		} else {
			this.updateFilter({ value: [] });
		}
	}
	selectOption(option) {
		const value = this.state.metaDown ? this.props.filter.value.concat(option.value) : [option.value];

		this.updateFilter({ value });
	}
	removeOption(option) {
		const value = this.state.metaDown ? this.props.filter.value.filter(i => i !== option.value) : [option.value];

		this.updateFilter({ value });
	}
	handleClick(option, selected) {
		selected ? this.removeOption(option) : this.selectOption(option);
	}
	updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	}

	// ==============================
	// RENDERERS
	// ==============================

	renderOptions() {
		return this.props.field.ops.map((option, i) => {
			const selected = this.props.filter.value.indexOf(option.value) > -1;
			return _react2.default.createElement(FilterOption, {
				key: `item-${i}-${option.value}`,
				option: option,
				selected: selected,
				onClick: this.handleClick
			});
		});
	}
	render() {
		const { field, filter } = this.props;
		const indeterminate = filter.value.length < field.ops.length;

		const metaKeyLabel = this.state.osName === 'MacOS' ? 'cmd' : 'ctrl';

		const fieldStyles = {
			alignItems: 'center',
			borderBottom: '1px dashed rgba(0,0,0,0.1)',
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: '1em',
			paddingBottom: '1em'
		};

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, {
					equalWidthSegments: true,
					onChange: this.toggleInverted,
					options: INVERTED_OPTIONS,
					value: filter.inverted
				})
			),
			_react2.default.createElement(
				'div',
				{ style: fieldStyles },
				_react2.default.createElement(
					_elemental.Button,
					{ size: 'xsmall', onClick: this.toggleAllOptions, style: { padding: 0, width: 50 } },
					indeterminate ? 'All' : 'None'
				),
				_react2.default.createElement(
					_elemental.FormNote,
					{ style: { margin: 0 } },
					'Hold ',
					_react2.default.createElement(
						_Kbd2.default,
						null,
						metaKeyLabel
					),
					' to select multiple options'
				)
			),
			this.renderOptions()
		);
	}
};

SelectFilter.propTypes = {
	field: _react.PropTypes.object,
	filter: _react.PropTypes.shape({
		inverted: _react.PropTypes.boolean,
		value: _react.PropTypes.array
	})
};
SelectFilter.getDefaultValue = getDefaultValue;
SelectFilter.defaultProps = {
	filter: getDefaultValue()
};

module.exports = SelectFilter;