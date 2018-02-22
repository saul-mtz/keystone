'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _ScrollLock = require('../ScrollLock');

var _ScrollLock2 = _interopRequireDefault(_ScrollLock);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

class ModalDialog extends _react.Component {
	constructor() {
		super();

		this.handleBackdropClick = this.handleBackdropClick.bind(this);
		this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
	}
	getChildContext() {
		return {
			onClose: this.props.onClose
		};
	}
	componentWillReceiveProps(nextProps) {
		if (!canUseDom) return;

		// add event listeners
		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
		if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillUnmount() {
		if (this.props.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}

	// ==============================
	// Methods
	// ==============================

	handleKeyboardInput(event) {
		if (event.keyCode === 27) this.props.onClose();

		return false;
	}
	handleBackdropClick(e) {
		if (e.target !== this.refs.container) return;

		this.props.onClose();
	}

	// ==============================
	// Renderers
	// ==============================

	renderDialog() {
		const {
			backdropClosesModal,
			children,
			isOpen,
			width
		} = this.props;

		if (!isOpen) return _react2.default.createElement('span', { key: 'closed' });

		return _react2.default.createElement(
			'div',
			{
				className: (0, _noImportant.css)(classes.container),
				key: 'open',
				ref: 'container',
				onClick: !!backdropClosesModal && this.handleBackdropClick,
				onTouchEnd: !!backdropClosesModal && this.handleBackdropClick
			},
			_react2.default.createElement(
				'div',
				{ className: (0, _noImportant.css)(classes.dialog), style: { width }, 'data-screen-id': 'modal-dialog' },
				children
			),
			_react2.default.createElement(_ScrollLock2.default, null)
		);
	}
	render() {
		return _react2.default.createElement(
			_Portal2.default,
			null,
			this.renderDialog()
		);
	}
};

ModalDialog.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	enableKeyboardInput: _react.PropTypes.bool,
	isOpen: _react.PropTypes.bool,
	onClose: _react.PropTypes.func.isRequired,
	width: _react.PropTypes.number
};
ModalDialog.defaultProps = {
	enableKeyboardInput: true,
	width: 768
};
ModalDialog.childContextTypes = {
	onClose: _react.PropTypes.func.isRequired
};

const classes = _noImportant.StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: _theme2.default.modal.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: _theme2.default.modal.zIndex
	},
	dialog: {
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		maxHeight: '96%',
		overflowY: 'scroll',
		paddingBottom: _theme2.default.modal.padding.dialog.vertical,
		paddingLeft: _theme2.default.modal.padding.dialog.horizontal,
		paddingRight: _theme2.default.modal.padding.dialog.horizontal,
		paddingTop: _theme2.default.modal.padding.dialog.vertical,
		position: 'relative'
	}
});

exports.default = ModalDialog;