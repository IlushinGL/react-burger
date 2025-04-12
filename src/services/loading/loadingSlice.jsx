import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: { status: true },
	reducers: {
		set(state, action) {
			state.status = action.payload;
		},
	},
});

export const { set } = loadingSlice.actions; // генераторы действий
export default loadingSlice.reducer;
