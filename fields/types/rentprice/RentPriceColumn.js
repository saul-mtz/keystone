import React from 'react';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

module.exports = ({ col, data }) => (
	<ItemsTableCell>
		<ItemsTableValue field={col.type}>
			{data.fields[col.path] || '-'}
		</ItemsTableValue>
	</ItemsTableCell>
);
