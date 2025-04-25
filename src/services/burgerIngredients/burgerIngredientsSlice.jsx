import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/payloads';

export const fetchAllIngedients = createAsyncThunk(
	'ingrediens/getAll',
	async () => {
		return getIngredients();
	}
);

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState: { data: [], status: 'loading', error: '' },
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
				if (action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.data = action.payload.data.map((element) => {
						return { ...element, count: 0 };
					});
				} else {
					state.status = 'error';
					state.error = 'Что-то пошло не так. Сервер вернул success=false.';
				}
			})
			.addCase(fetchAllIngedients.rejected, (state, action) => {
				console.log(action.error);
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const { clear_counts, set_count } = burgerIngredientsSlice.actions; // генераторы действий
export default burgerIngredientsSlice.reducer;
