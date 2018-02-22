'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DISTANCE_OPTIONS = [{ label: 'Max distance (km)', value: 'max' }, { label: 'Min distance (km)', value: 'min' }];

function getDefaultValue() {
	return {
		lat: undefined,
		lon: undefined,
		distance: {
			mode: DISTANCE_OPTIONS[0].value,
			value: undefined
		}
	};
}

var TextFilter = _react2.default.createClass({
	displayName: 'TextFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			lat: _react2.default.PropTypes.number,
			lon: _react2.default.PropTypes.number,
			distance: _react2.default.PropTypes.shape({
				mode: _react2.default.PropTypes.string,
				value: _react2.default.PropTypes.number
			})
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	changeLat(evt) {
		this.updateFilter({ lat: evt.target.value });
	},
	changeLon(evt) {
		this.updateFilter({ lon: evt.target.value });
	},
	changeDistanceValue(evt) {
		this.updateFilter({
			distance: {
				mode: this.props.filter.distance.mode,
				value: evt.target.value
			}
		});
	},
	changeDistanceMode(mode) {
		this.updateFilter({
			distance: {
				mode,
				value: this.props.filter.distance.value
			}
		});
	},
	render() {
		const { filter } = this.props;
		const distanceModeVerb = filter.distance.mode === 'max' ? 'Maximum' : 'Minimum';

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.Grid.Row,
				{ xsmall: 'one-half', gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(
						_elemental.FormField,
						{ label: 'Latitude' },
						_react2.default.createElement(_elemental.FormInput, {
							autoFocus: true,
							onChange: this.changeLat,
							placeholder: 'Latitude',
							ref: 'latitude',
							required: 'true',
							step: 0.01,
							type: 'number',
							value: filter.lat
						})
					)
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(
						_elemental.FormField,
						{ label: 'Longitude' },
						_react2.default.createElement(_elemental.FormInput, {
							onChange: this.changeLon,
							placeholder: 'Longitude',
							ref: 'longitude',
							required: 'true',
							step: 0.01,
							type: 'number',
							value: filter.lon
						})
					)
				)
			),
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, {
					equalWidthSegments: true,
					onChange: this.changeDistanceMode,
					options: DISTANCE_OPTIONS,
					value: this.props.filter.distance.mode
				})
			),
			_react2.default.createElement(_elemental.FormInput, {
				onChange: this.changeDistanceValue,
				placeholder: distanceModeVerb + ' distance from point',
				ref: 'distance',
				type: 'number',
				value: filter.distance.value
			})
		);
	}
});

module.exports = TextFilter;