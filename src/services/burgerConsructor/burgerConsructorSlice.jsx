import { createSlice } from '@reduxjs/toolkit';
import { keyGenerator } from '@utils/custom-functions';

const burgerConsructorSlice = createSlice({
	name: 'burgerConsructor',
	initialState: {
		data: {
			order: { number: '' },
			name: '',
			bun: '',
			success: false,
			filling: [],
		},
	},
	reducers: {
		set(state, action) {
			const filling = action.payload.filling.map((item, i) => {
				return { key: keyGenerator([item, i]), id: item };
			});
			state.data = { ...action.payload, filling: filling };
		},
	},
});

export const { set } = burgerConsructorSlice.actions; // генераторы действий
export default burgerConsructorSlice.reducer;
