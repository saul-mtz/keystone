'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ListManagement(_ref) {
	let {
		checkedItemCount,
		handleDelete,
		handleSelect,
		handleToggle,
		isOpen,
		itemCount,
		itemsPerPage,
		nodelete,
		noedit,
		selectAllItemsLoading
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['checkedItemCount', 'handleDelete', 'handleSelect', 'handleToggle', 'isOpen', 'itemCount', 'itemsPerPage', 'nodelete', 'noedit', 'selectAllItemsLoading']);

	// do not render if there's no results
	// or if edit/delete unavailable on the list
	if (!itemCount || nodelete && noedit) return null;

	const buttonNoteStyles = { color: '#999', fontWeight: 'normal' };

	// delete button
	const actionButtons = isOpen && _react2.default.createElement(
		_elemental.InlineGroupSection,
		null,
		_react2.default.createElement(
			_elemental.GlyphButton,
			{
				color: 'cancel',
				disabled: !checkedItemCount,
				glyph: 'trashcan',
				onClick: handleDelete,
				position: 'left',
				variant: 'link' },
			'Delete'
		)
	);

	// select buttons
	const allVisibleButtonIsActive = checkedItemCount === itemCount;
	const pageVisibleButtonIsActive = checkedItemCount === itemsPerPage;
	const noneButtonIsActive = !checkedItemCount;
	const selectAllButton = itemCount > itemsPerPage && _react2.default.createElement(
		_elemental.InlineGroupSection,
		null,
		_react2.default.createElement(
			_elemental.Button,
			{
				active: allVisibleButtonIsActive,
				onClick: () => handleSelect('all'),
				title: 'Select all rows (including those not visible)' },
			selectAllItemsLoading ? _react2.default.createElement(_elemental.Spinner, null) : 'All',
			' ',
			_react2.default.createElement(
				'small',
				{ style: buttonNoteStyles },
				'(',
				itemCount,
				')'
			)
		)
	);

	const selectButtons = isOpen ? _react2.default.createElement(
		_elemental.InlineGroupSection,
		null,
		_react2.default.createElement(
			_elemental.InlineGroup,
			{ contiguous: true },
			selectAllButton,
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ active: pageVisibleButtonIsActive, onClick: () => handleSelect('visible'), title: 'Select all rows' },
					itemCount > itemsPerPage ? 'Page ' : 'All ',
					_react2.default.createElement(
						'small',
						{ style: buttonNoteStyles },
						'(',
						itemCount > itemsPerPage ? itemsPerPage : itemCount,
						')'
					)
				)
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ active: noneButtonIsActive, onClick: () => handleSelect('none'), title: 'Deselect all rows' },
					'None'
				)
			)
		)
	) : null;

	// selected count text
	const selectedCountText = isOpen ? _react2.default.createElement(
		_elemental.InlineGroupSection,
		null,
		_react2.default.createElement(
			'span',
			{ style: { color: '#666', display: 'inline-block', lineHeight: '2.4em', margin: 1 } },
			checkedItemCount,
			' selected'
		)
	) : null;

	// put it all together
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_elemental.InlineGroup,
			{ style: { float: 'left', marginRight: '.75em', marginBottom: 0 } },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ active: isOpen, onClick: () => handleToggle(!isOpen) },
					'Manage'
				)
			),
			selectButtons,
			actionButtons,
			selectedCountText
		)
	);
};

ListManagement.propTypes = {
	checkedItems: _react.PropTypes.number,
	handleDelete: _react.PropTypes.func.isRequired,
	handleSelect: _react.PropTypes.func.isRequired,
	handleToggle: _react.PropTypes.func.isRequired,
	isOpen: _react.PropTypes.bool,
	itemCount: _react.PropTypes.number,
	itemsPerPage: _react.PropTypes.number,
	nodelete: _react.PropTypes.bool,
	noedit: _react.PropTypes.bool,
	selectAllItemsLoading: _react.PropTypes.bool
};

module.exports = ListManagement;