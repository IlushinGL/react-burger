import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { TIngredientLink, TIngredientWithCount } from '@utils/types';

export const list = (state: RootState) => state.burgerConstructor.filling;

export const all = createSelector(
	(state: RootState) => state.burgerConstructor,
	(data) => {
		const filling = data.filling.map((item: TIngredientLink) => item.id);
		return [data.bun, ...filling, data.bun];
	}
);

export const get_byId = createSelector(
	(state) => state.burgerIngredients.data,
	(state, id) => id,
	(data, id) => {
		return data.find((item: TIngredientWithCount) => item._id === id);
	}
);
