import React from 'react';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

import { format } from './lib';

const { currency, locale } = Keystone;

module.exports = (props) => {
	const { col, data } = props;
	const formatOptions = {
		currency,
		forceInteger: col.field.forceInteger,
		locale,
	};

	return (
		<ItemsTableCell>
			<ItemsTableValue field={col.type}>
				{`${format(data.fields[col.path], formatOptions)}`}
			</ItemsTableValue>
		</ItemsTableCell>
	);
};
