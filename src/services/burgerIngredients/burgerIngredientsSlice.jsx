import { createSlice } from '@reduxjs/toolkit';

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState: { data: [] },
	reducers: {
		set(state, action) {
			state.data = action.payload.map((element) => {
				return { ...element, count: 0 };
			});
		},
		set_count(state, action) {
			const newData = state.data.map((element) => {
				return { ...element, count: 0 };
			});
			let index = -1;
			action.payload.forEach((item) => {
				index = newData.findIndex((element) => element._id === item);
				if (index >= 0) {
					newData[index].count += 1;
				}
			});
			state.data = newData;
		},
	},
});

export const { set, set_count } = burgerIngredientsSlice.actions; // генераторы действий
export default burgerIngredientsSlice.reducer;
