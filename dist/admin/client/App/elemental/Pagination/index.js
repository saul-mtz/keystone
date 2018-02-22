'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Pagination extends _react.Component {
	renderCount() {
		let count = '';
		const { currentPage, pageSize, plural, singular, total } = this.props;
		if (!total) {
			count = 'No ' + (plural || 'records');
		} else if (total > pageSize) {
			let start = pageSize * (currentPage - 1) + 1;
			let end = Math.min(start + pageSize - 1, total);
			count = `Showing ${start} to ${end} of ${total}`;
		} else {
			count = 'Showing ' + total;
			if (total > 1 && plural) {
				count += ' ' + plural;
			} else if (total === 1 && singular) {
				count += ' ' + singular;
			}
		}
		return _react2.default.createElement(
			'div',
			{ className: (0, _noImportant.css)(classes.count), 'data-e2e-pagination-count': true },
			count
		);
	}
	renderPages() {
		const { currentPage, limit, onPageSelect, pageSize, total } = this.props;

		if (total <= pageSize) return null;

		let pages = [];
		let totalPages = Math.ceil(total / pageSize);
		let minPage = 1;
		let maxPage = totalPages;

		if (limit && limit < totalPages) {
			let rightLimit = Math.floor(limit / 2);
			let leftLimit = rightLimit + limit % 2 - 1;
			minPage = currentPage - leftLimit;
			maxPage = currentPage + rightLimit;

			if (minPage < 1) {
				maxPage = limit;
				minPage = 1;
			}
			if (maxPage > totalPages) {
				minPage = totalPages - limit + 1;
				maxPage = totalPages;
			}
		}
		if (minPage > 1) {
			pages.push(_react2.default.createElement(
				_page2.default,
				{ key: 'page_start', onClick: () => onPageSelect(1) },
				'...'
			));
		}
		for (let page = minPage; page <= maxPage; page++) {
			let selected = page === currentPage;
			/* eslint-disable no-loop-func */
			pages.push(_react2.default.createElement(
				_page2.default,
				{ key: 'page_' + page, selected: selected, onClick: () => onPageSelect(page) },
				page
			));
			/* eslint-enable */
		}
		if (maxPage < totalPages) {
			pages.push(_react2.default.createElement(
				_page2.default,
				{ key: 'page_end', onClick: () => onPageSelect(totalPages) },
				'...'
			));
		}
		return _react2.default.createElement(
			'div',
			{ className: (0, _noImportant.css)(classes.list) },
			pages
		);
	}
	render() {
		const className = (0, _noImportant.css)(classes.container, this.props.className);
		return _react2.default.createElement(
			'div',
			{ className: className, style: this.props.style },
			this.renderCount(),
			this.renderPages()
		);
	}
};

const classes = _noImportant.StyleSheet.create({
	container: {
		display: 'block',
		lineHeight: _theme2.default.component.lineHeight,
		marginBottom: '2em'
	},
	count: {
		display: 'inline-block',
		marginRight: '1em',
		verticalAlign: 'middle'
	},
	list: {
		display: 'inline-block',
		verticalAlign: 'middle'
	}
});

Pagination.propTypes = {
	className: _react.PropTypes.string,
	currentPage: _react.PropTypes.number.isRequired,
	limit: _react.PropTypes.number,
	onPageSelect: _react.PropTypes.func,
	pageSize: _react.PropTypes.number.isRequired,
	plural: _react.PropTypes.string,
	singular: _react.PropTypes.string,
	style: _react.PropTypes.object,
	total: _react.PropTypes.number.isRequired
};

module.exports = Pagination;