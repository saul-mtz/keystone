'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IMAGE_SIZE = 18;

const linkStyle = {
	marginRight: 8
};
const boxStyle = {
	borderRadius: 3,
	display: 'inline-block',
	height: IMAGE_SIZE,
	overflow: 'hidden',
	verticalAlign: 'middle',
	width: IMAGE_SIZE
};
const imageStyle = {
	display: 'block',
	height: IMAGE_SIZE,
	left: '50%',
	position: 'relative',

	WebkitTransform: 'translateX(-50%)',
	MozTransform: 'translateX(-50%)',
	msTransform: 'translateX(-50%)',
	transform: 'translateX(-50%)'
};
const textStyle = {
	color: '#888',
	display: 'inline-block',
	fontSize: '.8rem',
	marginLeft: 8,
	verticalAlign: 'middle'
};

var CloudinaryImageSummary = _react2.default.createClass({
	displayName: 'CloudinaryImageSummary',
	propTypes: {
		image: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.oneOf(['dimensions', 'publicId'])
	},
	renderLabel() {
		if (!this.props.label) return;

		const { label, image } = this.props;

		let text;
		if (label === 'dimensions') {
			text = `${image.width} × ${image.height}`;
		} else {
			text = `${image.public_id}.${image.format}`;
		}

		return _react2.default.createElement(
			'span',
			{ style: textStyle },
			text
		);
	},
	renderImageThumbnail() {
		if (!this.props.image) return;
		const url = this.props.image.url.replace(/image\/upload/, `image/upload/c_thumb,g_face,h_${IMAGE_SIZE},w_${IMAGE_SIZE}`);
		return _react2.default.createElement('img', { src: url, style: imageStyle, className: 'img-load' });
	},
	render() {
		return _react2.default.createElement(
			'span',
			{ style: linkStyle },
			_react2.default.createElement(
				'span',
				{ style: boxStyle },
				this.renderImageThumbnail()
			),
			this.renderLabel()
		);
	}
});

module.exports = CloudinaryImageSummary;