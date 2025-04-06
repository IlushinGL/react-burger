import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: { loading: true },
	reducers: {
		set(state, action) {
			state.loading = action.payload;
		},
	},
});

export const { set } = loadingSlice.actions; // генераторы действий
export default loadingSlice.reducer;
