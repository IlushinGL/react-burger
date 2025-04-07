import { createSelector } from '@reduxjs/toolkit';

export const all = createSelector(
	(state) => state.burgerConstructor.data,
	(data) => {
		const filling = data.filling.map((item) => item.id);
		return { data: data, arr: [data.bun, ...filling, data.bun] };
	}
);

export const total = createSelector(
	all,
	(state) => state.burgerIngredients.data,
	(order, ingredients) => {
		const filling = order.arr.map((item) => {
			return ingredients.find((element) => element._id === item);
		});
		return filling.reduce((sum, item) => {
			return sum + item.price;
		}, 0);
	}
);
