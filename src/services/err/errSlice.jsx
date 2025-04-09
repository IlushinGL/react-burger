import { createSlice } from '@reduxjs/toolkit';

const errSlice = createSlice({
	name: 'err',
	initialState: { message: '' },
	reducers: {
		set(state, action) {
			state.message = action.payload;
		},
	},
});

export const { set } = errSlice.actions; // генераторы действий
export default errSlice.reducer;
