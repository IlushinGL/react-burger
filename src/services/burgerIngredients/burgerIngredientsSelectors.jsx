// import { createSelector } from '@reduxjs/toolkit';

export const all = (state) => {
	return state.burgerIngredients.data;
};
export const byType = (state, type) => {
	return state.burgerIngredients.data
		.filter((item) => item.type === type)
		.sort((a, b) => (a.name < b.name ? -1 : 1));
};
