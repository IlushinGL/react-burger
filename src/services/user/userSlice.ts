import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserUpdate } from '@services/actionsThunk';
import { TUserData } from '@utils/types';

export interface IuserSlice {
	user: TUserData | null;
	status: string;
	error: string;
	isAuth: boolean;
}
const initialState: IuserSlice = {
	user: null,
	status: 'idle',
	error: '',
	isAuth: false,
};

const userSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TUserData | null>) {
			state.user = action.payload;
			state.status = 'idle';
			state.error = '';
		},
		setIsAuth(state, action: PayloadAction<boolean>) {
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
				if (action.payload && action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.user = action.payload.user;
				} else {
					state.status = 'error';
					state.error = 'Не удалось обновить данные пользователя.';
				}
			})
			.addCase(fetchUserUpdate.rejected, (state) => {
				state.status = 'error';
				state.error = 'Не удалось обновить данные пользователя.';
				state.user = null;
				state.isAuth = false;
			});
	},
});

export const { setUser, setIsAuth } = userSlice.actions; // генераторы действий
export default userSlice.reducer;
