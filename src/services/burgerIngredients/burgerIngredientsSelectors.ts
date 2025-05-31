import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { TIngredientWithCount } from '@utils/types';

export const all = (state: RootState) => state.burgerIngredients.data;
export const status = (state: RootState) => state.burgerIngredients.status;
export const error = (state: RootState) => state.burgerIngredients.error;

export const byType = createSelector(
	all,
	(state, type) => type,
	(data, type) => {
		return data
			.filter((item: TIngredientWithCount) => item.type === type)
			.sort((a: TIngredientWithCount, b: TIngredientWithCount) =>
				a.name < b.name ? -1 : 1
			);
	}
);

export const byId = createSelector(
	all,
	(state, id) => id,
	(data, id) => {
		return data.find((item: TIngredientWithCount) => item._id === id);
	}
);

export const total = (state: RootState) => {
	const order = state.burgerIngredients.data.filter(
		(item: TIngredientWithCount) => item.count > 0
	);
	return order.reduce((sum: number, item: TIngredientWithCount) => {
		return sum + item.price * item.count;
	}, 0);
};
