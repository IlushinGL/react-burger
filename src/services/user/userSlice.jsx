import { createSlice } from '@reduxjs/toolkit';
import { fetchUserSet } from '@services/actionsThunk';

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
			.addCase(fetchUserSet.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(fetchUserSet.fulfilled, (state, action) => {
				if (action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.name = action.payload.user.name;
					state.email = action.payload.user.email;
					state.auth = true;
					localStorage.setItem('refreshToken', action.payload.refreshToken);
					localStorage.setItem('accessToken', action.payload.accessToken);
				} else {
					state.status = 'error';
					state.error = action.payload.message;
					state.name = '';
					state.email = '';
					state.auth = false;
				}
			})
			.addCase(fetchUserSet.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
				state.name = '';
				state.email = '';
				state.auth = false;
			});
	},
});

export const { setUser, setIsAuth } = userSlice.actions; // генераторы действий
export default userSlice.reducer;
