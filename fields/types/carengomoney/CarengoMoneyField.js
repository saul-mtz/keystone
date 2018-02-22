import { Button, FormInput, InputGroup } from 'elemental';

import Field from '../Field';
import React, { PropTypes } from 'react';
import { formatNumber } from './lib';

const Component = Field.create({

	propTypes: {
		onChange: PropTypes.func.isRequired,
		path: PropTypes.string.isRequired,
		value: PropTypes.number,
	},

	valueChanged (event) {
		const newValue = event.target.value.replace(/[^\d\,\.]/g, '');
		const { forceInteger, path, value } = this.props;
		if (newValue === value) return;

		if (!newValue) {
			return this.props.onChange({
				path,
				value: '',
			});
		}

		// quick and dirty hack to allow float values
		this.endWithPoint = !forceInteger && newValue && newValue.length && newValue[newValue.length - 1] === '.';
		this.props.onChange({
			path,
			value: forceInteger ? parseInt(newValue * 100) : newValue * 100,
		});
	},

	renderField () {
		const { disabled, forceInteger, path, taxIncluded, value } = this.props;
		const buttonType = disabled ? 'default' : 'hollow-primary';
		const name = this.getInputName(path);

		const taxGroup = taxIncluded ? (
			<InputGroup.Section>
				<Button type={buttonType}>IVA included</Button>
			</InputGroup.Section>
		) : null;

		return (
			<InputGroup contiguous style={{ marginBottom: 0, color: 'red' }}>
				<InputGroup.Section>
					<Button type={buttonType}>$</Button>
				</InputGroup.Section>
				<InputGroup.Section grow>
					<FormInput
						autoComplete="off"
						disabled={disabled}
						name={name}
						value={`${formatNumber(value, forceInteger)}${this.endWithPoint ? '.' : ''}`}
						onChange={this.valueChanged} />
				</InputGroup.Section>
				{taxGroup}
			</InputGroup>
		);
	},

});


export default Component;

module.exports = Component;
