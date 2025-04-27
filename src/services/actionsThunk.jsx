import { setUser, setIsAuth } from './user/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api';

export const fetchUserSet = createAsyncThunk(
	'user/set',
	async (data, { dispatch }) => {
		api
			.setUser(data)
			.then((res) => dispatch(setUser(res.user)))
			.catch((err) => console.log(err));
	}
);

export const fetchUserUpdate = createAsyncThunk('user/update', async (data) => {
	return api.updateUser(data);
});

export const fetchLogOut = createAsyncThunk(
	'user/logout',
	async (_, { dispatch }) => {
		api.logOut().then(() => dispatch(setUser(null)));
	}
);

export const fetchLogIn = createAsyncThunk(
	'user/login',
	async (data, { dispatch }) => {
		api
			.logIn(data)
			.then((res) => dispatch(setUser(res.user)))
			.catch((err) => console.log(err));
	}
);

export async function setPswdForgot(data) {
	try {
		const res = await api.pswdForgot(data);
		return res;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function resetPswd(data) {
	try {
		const res = await api.pswdReset(data);
		return res;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export const fetchAddOrder = createAsyncThunk(
	'order/add',
	async (ingredientsArr) => {
		return api.addOrder(ingredientsArr);
	}
);

export const fetchAllIngedients = createAsyncThunk(
	'ingrediens/getAll',
	async () => {
		return api.getIngredients();
	}
);

export const checkUserAuth = createAsyncThunk(
	'user/checkAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			api
				.getUser()
				.then((res) => dispatch(setUser(res.user)))
				.finally(() => dispatch(setIsAuth(true)));
		} else {
			dispatch(setIsAuth(true));
		}
	}
);
