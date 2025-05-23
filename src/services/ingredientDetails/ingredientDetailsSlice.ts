import { createSlice } from '@reduxjs/toolkit';
import { TIngredientWithCount } from '@utils/types';

export interface IingredientDetails {
	data: TIngredientWithCount[] | null;
}
const initialState: IingredientDetails = {
	data: null,
};

const ingredientDetails = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		set(state, action) {
			state.data = action.payload;
		},
	},
});

export const { set } = ingredientDetails.actions; // генераторы действий
export default ingredientDetails.reducer;
