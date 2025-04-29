import { createSlice } from '@reduxjs/toolkit';
import { fetchUserUpdate } from '@services/actionsThunk';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: 'idle',
		error: '',
		isAuth: false,
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.status = 'idle';
			state.error = '';
		},
		setIsAuth(state, action) {
			state.isAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserUpdate.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(fetchUserUpdate.fulfilled, (state, action) => {
				if (action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.user = action.payload.user;
					// localStorage.setItem('refreshToken', action.payload.refreshToken);
					// localStorage.setItem('accessToken', action.payload.accessToken);
				} else {
					state.status = 'error';
					state.error = action.payload.message;
					state.user = null;
				}
			})
			.addCase(fetchUserUpdate.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
				state.user = null;
			});
	},
});

export const { setUser, setIsAuth } = userSlice.actions; // генераторы действий
export default userSlice.reducer;
