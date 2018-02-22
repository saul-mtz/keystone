'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinymce = require('tinymce');

var _tinymce2 = _interopRequireDefault(_tinymce);

var _elemental = require('../../../admin/client/App/elemental');

var _evalDependsOn = require('../../utils/evalDependsOn');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Remove dependency on underscore
 */

var lastId = 0;

function getId() {
	return 'keystone-html-' + lastId++;
}

// Workaround for #2834 found here https://github.com/tinymce/tinymce/issues/794#issuecomment-203701329
function removeTinyMCEInstance(editor) {
	var oldLength = _tinymce2.default.editors.length;
	_tinymce2.default.remove(editor);
	if (oldLength === _tinymce2.default.editors.length) {
		_tinymce2.default.editors.remove(editor);
	}
}

module.exports = _Field2.default.create({

	displayName: 'HtmlField',
	statics: {
		type: 'Html'
	},

	getInitialState() {
		return {
			id: getId(),
			isFocused: false,
			wysiwygActive: false
		};
	},

	initWysiwyg() {
		if (!this.props.wysiwyg) return;

		var self = this;
		var opts = this.getOptions();

		opts.setup = function (editor) {
			self.editor = editor;
			editor.on('change', self.valueChanged);
			editor.on('focus', self.focusChanged.bind(self, true));
			editor.on('blur', self.focusChanged.bind(self, false));
		};

		this._currentValue = this.props.value;
		_tinymce2.default.init(opts);
		if ((0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
			this.setState({ wysiwygActive: true });
		}
	},

	removeWysiwyg(state) {
		removeTinyMCEInstance(_tinymce2.default.get(state.id));
		this.setState({ wysiwygActive: false });
	},

	componentDidUpdate(prevProps, prevState) {
		if (prevState.isCollapsed && !this.state.isCollapsed) {
			this.initWysiwyg();
		}

		if (this.props.wysiwyg) {
			if ((0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
				if (!this.state.wysiwygActive) {
					this.initWysiwyg();
				}
			} else if (this.state.wysiwygActive) {
				this.removeWysiwyg(prevState);
			}
		}
	},

	componentDidMount() {
		this.initWysiwyg();
	},

	componentWillReceiveProps(nextProps) {
		if (this.editor && this._currentValue !== nextProps.value) {
			this.editor.setContent(nextProps.value);
		}
	},

	focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
	},

	valueChanged(event) {
		var content;
		if (this.editor) {
			content = this.editor.getContent();
		} else {
			content = event.target.value;
		}

		this._currentValue = content;
		this.props.onChange({
			path: this.props.path,
			value: content
		});
	},

	getOptions() {
		var plugins = ['code', 'link'];
		var options = Object.assign({}, Keystone.wysiwyg.options, this.props.wysiwyg);
		var toolbar = options.overrideToolbar ? '' : 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | removeformat | link ';
		var i;

		if (options.enableImages) {
			plugins.push('image');
			toolbar += ' | image';
		}

		if (options.enableCloudinaryUploads || options.enableS3Uploads) {
			plugins.push('uploadimage');
			toolbar += options.enableImages ? ' uploadimage' : ' | uploadimage';
		}

		if (options.additionalButtons) {
			var additionalButtons = options.additionalButtons.split(',');
			for (i = 0; i < additionalButtons.length; i++) {
				toolbar += ' | ' + additionalButtons[i];
			}
		}
		if (options.additionalPlugins) {
			var additionalPlugins = options.additionalPlugins.split(',');
			for (i = 0; i < additionalPlugins.length; i++) {
				plugins.push(additionalPlugins[i]);
			}
		}
		if (options.importcss) {
			plugins.push('importcss');
			var importcssOptions = {
				content_css: options.importcss,
				importcss_append: true,
				importcss_merge_classes: true
			};

			Object.assign(options.additionalOptions, importcssOptions);
		}

		if (!options.overrideToolbar) {
			toolbar += ' | code';
		}

		var opts = {
			selector: '#' + this.state.id,
			toolbar: toolbar,
			plugins: plugins,
			menubar: options.menubar || false,
			skin: options.skin || 'keystone'
		};

		if (this.shouldRenderField()) {
			opts.uploadimage_form_url = options.enableS3Uploads ? Keystone.adminPath + '/api/s3/upload' : Keystone.adminPath + '/api/cloudinary/upload';
		} else {
			Object.assign(opts, {
				mode: 'textareas',
				readonly: true,
				menubar: false,
				toolbar: 'code',
				statusbar: false
			});
		}

		if (options.additionalOptions) {
			Object.assign(opts, options.additionalOptions);
		}

		return opts;
	},

	renderField() {
		var className = this.state.isFocused ? 'is-focused' : '';
		var style = {
			height: this.props.height
		};
		return _react2.default.createElement(
			'div',
			{ className: className },
			_react2.default.createElement(_elemental.FormInput, {
				id: this.state.id,
				multiline: true,
				name: this.getInputName(this.props.path),
				onChange: this.valueChanged,
				className: this.props.wysiwyg ? 'wysiwyg' : 'code',
				style: style,
				value: this.props.value
			})
		);
	},

	renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ multiline: true, noedit: true },
			this.props.value
		);
	}

});