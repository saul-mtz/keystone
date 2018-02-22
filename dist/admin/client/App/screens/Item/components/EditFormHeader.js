'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditFormHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ToolbarSection = require('./Toolbar/ToolbarSection');

var _ToolbarSection2 = _interopRequireDefault(_ToolbarSection);

var _EditFormHeaderSearch = require('./EditFormHeaderSearch');

var _EditFormHeaderSearch2 = _interopRequireDefault(_EditFormHeaderSearch);

var _reactRouter = require('react-router');

var _Drilldown = require('./Drilldown');

var _Drilldown2 = _interopRequireDefault(_Drilldown);

var _elemental = require('../../../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EditFormHeader = exports.EditFormHeader = _react2.default.createClass({
	displayName: 'EditFormHeader',
	propTypes: {
		data: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object,
		toggleCreate: _react2.default.PropTypes.func
	},
	getInitialState() {
		return {
			searchString: ''
		};
	},
	toggleCreate(visible) {
		this.props.toggleCreate(visible);
	},
	searchStringChanged(event) {
		this.setState({
			searchString: event.target.value
		});
	},
	handleEscapeKey(event) {
		const escapeKeyCode = 27;

		if (event.which === escapeKeyCode) {
			(0, _reactDom.findDOMNode)(this.refs.searchField).blur();
		}
	},
	renderDrilldown() {
		return _react2.default.createElement(
			_ToolbarSection2.default,
			{ left: true },
			this.renderDrilldownItems(),
			this.renderSearch()
		);
	},
	renderDrilldownItems() {
		const { data, list } = this.props;
		const items = data.drilldown ? data.drilldown.items : [];

		let backPath = `${Keystone.adminPath}/${list.path}`;
		const backStyles = { paddingLeft: 0, paddingRight: 0 };
		// Link to the list page the user came from
		if (this.props.listActivePage && this.props.listActivePage > 1) {
			backPath = `${backPath}?page=${this.props.listActivePage}`;
		}

		// return a single back button when no drilldown exists
		if (!items.length) {
			return _react2.default.createElement(
				_elemental.GlyphButton,
				{
					component: _reactRouter.Link,
					'data-e2e-editform-header-back': true,
					glyph: 'chevron-left',
					position: 'left',
					style: backStyles,
					to: backPath,
					variant: 'link'
				},
				list.plural
			);
		}

		// prepare the drilldown elements
		const drilldown = [];
		items.forEach((item, idx) => {
			// FIXME @jedwatson
			// we used to support relationships of type MANY where items were
			// represented as siblings inside a single list item; this got a
			// bit messy...
			item.items.forEach(link => {
				drilldown.push({
					href: link.href,
					label: link.label,
					title: item.list.singular
				});
			});
		});

		// add the current list to the drilldown
		drilldown.push({
			href: backPath,
			label: list.plural
		});

		return _react2.default.createElement(_Drilldown2.default, { items: drilldown });
	},
	renderSearch() {
		var list = this.props.list;
		return _react2.default.createElement(
			'form',
			{ action: `${Keystone.adminPath}/${list.path}`, className: 'EditForm__header__search' },
			_react2.default.createElement(_EditFormHeaderSearch2.default, {
				value: this.state.searchString,
				onChange: this.searchStringChanged,
				onKeyUp: this.handleEscapeKey
			})
		);
	},
	renderInfo() {
		return _react2.default.createElement(
			_ToolbarSection2.default,
			{ right: true },
			this.renderCreateButton()
		);
	},
	renderCreateButton() {
		const { nocreate, autocreate, singular } = this.props.list;

		if (nocreate) return null;

		let props = {};
		if (autocreate) {
			props.href = '?new' + Keystone.csrf.query;
		} else {
			props.onClick = () => {
				this.toggleCreate(true);
			};
		}
		return _react2.default.createElement(
			_elemental.GlyphButton,
			_extends({ 'data-e2e-item-create-button': 'true', color: 'success', glyph: 'plus', position: 'left' }, props),
			_react2.default.createElement(_elemental.ResponsiveText, { hiddenXS: `New ${singular}`, visibleXS: 'Create' })
		);
	},
	render() {
		return _react2.default.createElement(
			_Toolbar2.default,
			null,
			this.renderDrilldown(),
			this.renderInfo()
		);
	}
});

exports.default = (0, _reactRedux.connect)(state => ({
	listActivePage: state.lists.page.index
}))(EditFormHeader);