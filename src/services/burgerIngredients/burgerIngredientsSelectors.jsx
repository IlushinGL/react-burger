import { createSelector } from '@reduxjs/toolkit';

export const all = (state) => state.burgerIngredients.data;
export const status = (state) => state.burgerIngredients.status;
export const error = (state) => state.burgerIngredients.error;

export const byType = createSelector(
	all,
	(state, type) => type,
	(data, type) => {
		return data
			.filter((item) => item.type === type)
			.sort((a, b) => (a.name < b.name ? -1 : 1));
	}
);

export const total = (state) => {
	const order = state.burgerIngredients.data.filter((item) => item.count > 0);
	return order.reduce((sum, item) => {
		return sum + item.price * item.count;
	}, 0);
};
