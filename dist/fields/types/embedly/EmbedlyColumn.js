"use strict";

var React = require('react');

var EmbedlyColumn = React.createClass({
	displayName: "EmbedlyColumn",

	renderValue: function () {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !_.size(value)) return;
		return React.createElement(
			"a",
			{ href: value.url, target: "_blank" },
			value.url
		);
	},
	render: function () {
		return React.createElement(
			"td",
			null,
			React.createElement(
				"div",
				{ className: "ItemList__value" },
				this.renderValue()
			)
		);
	}
});

module.exports = EmbedlyColumn;