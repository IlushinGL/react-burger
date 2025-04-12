import { createSelector } from '@reduxjs/toolkit';

export const list = (state) => state.burgerConstructor.filling;

export const all = createSelector(
	(state) => state.burgerConstructor,
	(data) => {
		const filling = data.filling.map((item) => item.id);
		return [data.bun, ...filling, data.bun];
	}
);

export const get_byId = createSelector(
	(state) => state.burgerIngredients.data,
	(state, id) => id,
	(data, id) => {
		return data.find((item) => item._id === id);
	}
);
