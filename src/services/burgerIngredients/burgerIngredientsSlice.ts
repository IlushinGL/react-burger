import { createSlice } from '@reduxjs/toolkit';
import { fetchAllIngedients } from '@services/actionsThunk';
import { TIngredientWithCount } from '@utils/types';

export interface IburgerIngredientsSlice {
	data: TIngredientWithCount[];
	status: string;
	error: string;
}
const initialState: IburgerIngredientsSlice = {
	data: [],
	status: 'loading',
	error: '',
};

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		clear_counts(state) {
			state.data
				.filter((item) => item.count > 0)
				.forEach((element) => {
					element.count = 0;
				});
		},
		set_count(state, action) {
			const index = state.data.findIndex(
				(element) => element._id === action.payload.id
			);
			if (index >= 0) {
				state.data[index].count += action.payload.shift;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllIngedients.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(fetchAllIngedients.fulfilled, (state, action) => {
				if (action.payload && action.payload.data) {
					state.status = 'idle';
					state.error = '';
					state.data = action.payload.data.map((element) => {
						return { ...element, count: 0 };
					});
				} else {
					state.status = 'error';
					state.error = 'Не удалось загрузить список ингредиентов';
				}
			})
			.addCase(fetchAllIngedients.rejected, (state, action) => {
				console.log(action.error);
				state.status = 'error';
				state.error = 'Не удалось загрузить список ингредиентов';
			});
	},
});

export const { clear_counts, set_count } = burgerIngredientsSlice.actions; // генераторы действий
export default burgerIngredientsSlice.reducer;
