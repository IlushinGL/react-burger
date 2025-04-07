import { createSelector } from '@reduxjs/toolkit';

export const all = (state) => state.burgerIngredients.data;

export const byType = createSelector(
	all,
	(state, type) => type,
	(data, type) => {
		return data
			.filter((item) => item.type === type)
			.sort((a, b) => (a.name < b.name ? -1 : 1));
	}
);
