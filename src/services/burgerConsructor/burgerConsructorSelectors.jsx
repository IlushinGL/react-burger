import { createSelector } from '@reduxjs/toolkit';

export const all = createSelector(
	(state) => state.burgerConstructor.data,
	(data) => {
		const filling = data.filling.map((item) => item.id);
		return { data: data, arr: [data.bun, ...filling, data.bun] };
	}
);
