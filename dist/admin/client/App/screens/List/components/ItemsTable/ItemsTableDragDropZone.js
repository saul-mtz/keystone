'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableDragDropZoneTarget = require('./ItemsTableDragDropZoneTarget');

var _ItemsTableDragDropZoneTarget2 = _interopRequireDefault(_ItemsTableDragDropZoneTarget);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemsTableDragDropZone = _react2.default.createClass({
	displayName: 'ItemsTableDragDropZone',
	propTypes: {
		columns: _react2.default.PropTypes.array,
		connectDropTarget: _react2.default.PropTypes.func,
		items: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object
	},
	renderPageDrops() {
		const { items, currentPage, pageSize } = this.props;

		const totalPages = Math.ceil(items.count / pageSize);
		const style = { display: totalPages > 1 ? null : 'none' };

		const pages = [];
		for (let i = 0; i < totalPages; i++) {
			const page = i + 1;
			const pageItems = '' + (page * pageSize - (pageSize - 1)) + ' - ' + page * pageSize;
			const current = page === currentPage;
			const className = (0, _classnames2.default)('ItemList__dropzone--page', {
				'is-active': current
			});
			pages.push(_react2.default.createElement(_ItemsTableDragDropZoneTarget2.default, {
				key: 'page_' + page,
				page: page,
				className: className,
				pageItems: pageItems,
				pageSize: pageSize,
				currentPage: currentPage,
				drag: this.props.drag,
				dispatch: this.props.dispatch
			}));
		}

		let cols = this.props.columns.length;
		if (this.props.list.sortable) cols++;
		if (!this.props.list.nodelete) cols++;
		return _react2.default.createElement(
			'tr',
			{ style: style },
			_react2.default.createElement(
				'td',
				{ colSpan: cols },
				_react2.default.createElement(
					'div',
					{ className: 'ItemList__dropzone' },
					pages,
					_react2.default.createElement('div', { className: 'clearfix' })
				)
			)
		);
	},
	render() {
		return this.renderPageDrops();
	}
}); /**
     * THIS IS ORPHANED AND ISN'T RENDERED AT THE MOMENT
     * THIS WAS DONE TO FINISH THE REDUX INTEGRATION, WILL REWRITE SOON
     * - @mxstbr
     */

module.exports = ItemsTableDragDropZone;