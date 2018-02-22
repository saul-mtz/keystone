'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

var _HiddenFileInput = require('../../components/HiddenFileInput');

var _HiddenFileInput2 = _interopRequireDefault(_HiddenFileInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let uploadInc = 1000; /**
                      TODO:
                      - Format size of stored file (if present) using bytes package?
                      - Display file type icon? (see LocalFileField)
                      */

const buildInitialState = props => ({
	action: null,
	removeExisting: false,
	uploadFieldPath: `File-${props.path}-${++uploadInc}`,
	userSelectedFile: null
});

module.exports = _Field2.default.create({
	propTypes: {
		autoCleanup: _react.PropTypes.bool,
		collapse: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		note: _react.PropTypes.string,
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.shape({
			filename: _react.PropTypes.string
		})
	},
	statics: {
		type: 'File',
		getDefaultValue: () => ({})
	},
	getInitialState() {
		return buildInitialState(this.props);
	},
	shouldCollapse() {
		return this.props.collapse && !this.hasExisting();
	},
	componentWillUpdate(nextProps) {
		// Show the new filename when it's finished uploading
		if (this.props.value.filename !== nextProps.value.filename) {
			this.setState(buildInitialState(nextProps));
		}
	},

	// ==============================
	// HELPERS
	// ==============================

	hasFile() {
		return this.hasExisting() || !!this.state.userSelectedFile;
	},
	hasExisting() {
		return this.props.value && !!this.props.value.filename;
	},
	getFilename() {
		return this.state.userSelectedFile ? this.state.userSelectedFile.name : this.props.value.filename;
	},

	// ==============================
	// METHODS
	// ==============================

	triggerFileBrowser() {
		this.refs.fileInput.clickDomNode();
	},
	handleFileChange(event) {
		const userSelectedFile = event.target.files[0];

		this.setState({
			userSelectedFile: userSelectedFile
		});
	},
	handleRemove(e) {
		var state = {};

		if (this.state.userSelectedFile) {
			state = buildInitialState(this.props);
		} else if (this.hasExisting()) {
			state.removeExisting = true;

			if (this.props.autoCleanup) {
				if (e.altKey) {
					state.action = 'reset';
				} else {
					state.action = 'delete';
				}
			} else {
				if (e.altKey) {
					state.action = 'delete';
				} else {
					state.action = 'reset';
				}
			}
		}

		this.setState(state);
	},
	undoRemove() {
		this.setState(buildInitialState(this.props));
	},

	// ==============================
	// RENDERERS
	// ==============================

	renderFileNameAndChangeMessage() {
		const href = this.props.value ? this.props.value.url : undefined;
		return _react2.default.createElement(
			'div',
			null,
			this.hasFile() && !this.state.removeExisting ? _react2.default.createElement(
				_FileChangeMessage2.default,
				{ href: href, target: '_blank' },
				this.getFilename()
			) : null,
			this.renderChangeMessage()
		);
	},
	renderChangeMessage() {
		if (this.state.userSelectedFile) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'success' },
				'Save to Upload'
			);
		} else if (this.state.removeExisting) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'danger' },
				'File ',
				this.props.autoCleanup ? 'deleted' : 'removed',
				' - save to confirm'
			);
		} else {
			return null;
		}
	},
	renderClearButton() {
		if (this.state.removeExisting) {
			return _react2.default.createElement(
				_elemental.Button,
				{ variant: 'link', onClick: this.undoRemove },
				'Undo Remove'
			);
		} else {
			var clearText;
			if (this.state.userSelectedFile) {
				clearText = 'Cancel Upload';
			} else {
				clearText = this.props.autoCleanup ? 'Delete File' : 'Remove File';
			}
			return _react2.default.createElement(
				_elemental.Button,
				{ variant: 'link', color: 'cancel', onClick: this.handleRemove },
				clearText
			);
		}
	},
	renderActionInput() {
		// If the user has selected a file for uploading, we need to point at
		// the upload field. If the file is being deleted, we submit that.
		if (this.state.userSelectedFile || this.state.action) {
			const value = this.state.userSelectedFile ? `upload:${this.state.uploadFieldPath}` : this.state.action === 'delete' ? 'remove' : '';
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				type: 'hidden',
				value: value
			});
		} else {
			return null;
		}
	},
	renderUI() {
		const { label, note, path } = this.props;
		const buttons = _react2.default.createElement(
			'div',
			{ style: this.hasFile() ? { marginTop: '1em' } : null },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.triggerFileBrowser },
				this.hasFile() ? 'Change' : 'Upload',
				' File'
			),
			this.hasFile() && this.renderClearButton()
		);

		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'file' },
			_react2.default.createElement(
				_elemental.FormField,
				{ label: label, htmlFor: path },
				this.shouldRenderField() ? _react2.default.createElement(
					'div',
					null,
					this.hasFile() && this.renderFileNameAndChangeMessage(),
					buttons,
					_react2.default.createElement(_HiddenFileInput2.default, {
						key: this.state.uploadFieldPath,
						name: this.state.uploadFieldPath,
						onChange: this.handleFileChange,
						ref: 'fileInput'
					}),
					this.renderActionInput()
				) : _react2.default.createElement(
					'div',
					null,
					this.hasFile() ? this.renderFileNameAndChangeMessage() : _react2.default.createElement(
						_elemental.FormInput,
						{ noedit: true },
						'no file'
					)
				),
				!!note && _react2.default.createElement(_elemental.FormNote, { html: note })
			)
		);
	}

});