import { createSlice } from '@reduxjs/toolkit';

const ingredientDetails = createSlice({
	name: 'ingredientDetails',
	initialState: { data: null },
	reducers: {
		set(state, action) {
			// console.log('ingredientDetails.set');
			state.data = action.payload;
		},
	},
});

export const { set } = ingredientDetails.actions; // генераторы действий
export default ingredientDetails.reducer;
