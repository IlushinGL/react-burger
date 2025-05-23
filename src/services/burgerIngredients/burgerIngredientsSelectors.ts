import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { TIngredient } from '@utils/types';

export const all = (state: RootState) => state.burgerIngredients.data;
export const status = (state: RootState) => state.burgerIngredients.status;
export const error = (state: RootState) => state.burgerIngredients.error;

export const byType = createSelector(
	all,
	(state, type) => type,
	(data, type) => {
		return data
			.filter((item: TIngredient) => item.type === type)
			.sort((a: TIngredient, b: TIngredient) => (a.name < b.name ? -1 : 1));
	}
);

export const byId = createSelector(
	all,
	(state, id) => id,
	(data, id) => {
		return data.find((item: TIngredient) => item._id === id);
	}
);

export const total = (state: RootState) => {
	const order = state.burgerIngredients.data.filter((item) => item.count > 0);
	return order.reduce((sum, item) => {
		return sum + item.price * item.count;
	}, 0);
};
