'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../elemental');

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _ListColumnsForm = require('./ListColumnsForm');

var _ListColumnsForm2 = _interopRequireDefault(_ListColumnsForm);

var _ListDownloadForm = require('./ListDownloadForm');

var _ListDownloadForm2 = _interopRequireDefault(_ListDownloadForm);

var _ListHeaderSearch = require('./ListHeaderSearch');

var _ListHeaderSearch2 = _interopRequireDefault(_ListHeaderSearch);

var _ListFiltersAdd = require('./Filtering/ListFiltersAdd');

var _ListFiltersAdd2 = _interopRequireDefault(_ListFiltersAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ButtonDivider(_ref) {
	let { style } = _ref,
	    props = _objectWithoutProperties(_ref, ['style']);

	props.style = _extends({
		borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
		paddingLeft: '0.75em'
	}, style);

	return _react2.default.createElement('div', props);
};

function CreateButton(_ref2) {
	let { listName, onClick } = _ref2,
	    props = _objectWithoutProperties(_ref2, ['listName', 'onClick']);

	return _react2.default.createElement(
		_elemental.GlyphButton,
		_extends({
			block: true,
			color: 'success',
			'data-e2e-list-create-button': 'header',
			glyph: 'plus',
			onClick: onClick,
			position: 'left',
			title: `Create ${listName}`
		}, props),
		_react2.default.createElement(_elemental.ResponsiveText, {
			visibleSM: 'Create',
			visibleMD: 'Create',
			visibleLG: `Create ${listName}`
		})
	);
};

function ListHeaderToolbar(_ref3) {
	let {
		// common
		dispatch,
		list,

		// expand
		expandIsActive,
		expandOnClick,

		// list
		createIsAvailable,
		createListName,
		createOnClick,

		// search
		searchHandleChange,
		searchHandleClear,
		searchHandleKeyup,
		searchValue,

		// filters
		filtersActive,
		filtersAvailable,

		// columns
		columnsAvailable,
		columnsActive

	} = _ref3,
	    props = _objectWithoutProperties(_ref3, ['dispatch', 'list', 'expandIsActive', 'expandOnClick', 'createIsAvailable', 'createListName', 'createOnClick', 'searchHandleChange', 'searchHandleClear', 'searchHandleKeyup', 'searchValue', 'filtersActive', 'filtersAvailable', 'columnsAvailable', 'columnsActive']);

	return _react2.default.createElement(
		_elemental.InlineGroup,
		{ block: true, aphroditeStyles: classes.wrapper },
		_react2.default.createElement(
			_elemental.InlineGroupSection,
			{ grow: true, aphroditeStyles: classes.search },
			_react2.default.createElement(_ListHeaderSearch2.default, {
				handleChange: searchHandleChange,
				handleClear: searchHandleClear,
				handleKeyup: searchHandleKeyup,
				value: searchValue
			})
		),
		_react2.default.createElement(
			_elemental.InlineGroupSection,
			{ grow: true, aphroditeStyles: classes.buttons },
			_react2.default.createElement(
				_elemental.InlineGroup,
				{ block: true },
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					{ aphroditeStyles: classes.filter },
					_react2.default.createElement(_ListFiltersAdd2.default, {
						dispatch: dispatch,
						activeFilters: filtersActive,
						availableFilters: filtersAvailable
					})
				),
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					{ aphroditeStyles: classes.columns },
					_react2.default.createElement(_ListColumnsForm2.default, {
						availableColumns: columnsAvailable,
						activeColumns: columnsActive,
						dispatch: dispatch
					})
				),
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					{ aphroditeStyles: classes.download },
					_react2.default.createElement(_ListDownloadForm2.default, {
						activeColumns: columnsActive,
						dispatch: dispatch,
						list: list
					})
				),
				_react2.default.createElement(
					_elemental.InlineGroupSection,
					{ aphroditeStyles: classes.expand },
					_react2.default.createElement(
						ButtonDivider,
						null,
						_react2.default.createElement(_elemental.GlyphButton, {
							active: expandIsActive,
							glyph: 'mirror',
							onClick: expandOnClick,
							title: 'Expand table width'
						})
					)
				),
				createIsAvailable && _react2.default.createElement(
					_elemental.InlineGroupSection,
					{ aphroditeStyles: classes.create },
					_react2.default.createElement(
						ButtonDivider,
						null,
						_react2.default.createElement(CreateButton, {
							listName: createListName,
							onClick: createOnClick
						})
					)
				)
			)
		)
	);
};

ListHeaderToolbar.propTypes = {
	columnsActive: _react.PropTypes.array,
	columnsAvailable: _react.PropTypes.array,
	createIsAvailable: _react.PropTypes.bool,
	createListName: _react.PropTypes.string,
	createOnClick: _react.PropTypes.func.isRequired,
	dispatch: _react.PropTypes.func.isRequired,
	expandIsActive: _react.PropTypes.bool,
	expandOnClick: _react.PropTypes.func.isRequired,
	filtersActive: _react.PropTypes.array,
	filtersAvailable: _react.PropTypes.array,
	list: _react.PropTypes.object,
	searchHandleChange: _react.PropTypes.func.isRequired,
	searchHandleClear: _react.PropTypes.func.isRequired,
	searchHandleKeyup: _react.PropTypes.func.isRequired,
	searchValue: _react.PropTypes.string
};

const tabletGrowStyles = {
	[`@media (max-width: ${_theme2.default.breakpoint.tabletPortraitMax})`]: {
		flexGrow: 1
	}
};

const classes = _noImportant.StyleSheet.create({
	// main wrapper
	wrapper: {
		[`@media (max-width: ${_theme2.default.breakpoint.tabletPortraitMax})`]: {
			flexWrap: 'wrap'
		}
	},

	// button wrapper
	buttons: {
		[`@media (max-width: ${_theme2.default.breakpoint.tabletPortraitMax})`]: {
			paddingLeft: 0
		}
	},

	// cols
	expand: {
		[`@media (max-width: ${_theme2.default.breakpoint.desktopMax})`]: {
			display: 'none'
		}
	},
	filter: {
		[`@media (max-width: ${_theme2.default.breakpoint.tabletPortraitMax})`]: {
			paddingLeft: 0,
			flexGrow: 1
		}
	},
	columns: tabletGrowStyles,
	create: tabletGrowStyles,
	download: tabletGrowStyles,
	search: {
		[`@media (max-width: ${_theme2.default.breakpoint.tabletPortraitMax})`]: {
			marginBottom: '0.75em',
			minWidth: '100%'
		}
	}
});

module.exports = ListHeaderToolbar;