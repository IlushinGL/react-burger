import { setUser, setIsAuth } from './user/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api';
import { TUserConfirm, TUserEmail, TUserLogIn, TUserReg } from '@utils/types';

export const fetchUserSet = createAsyncThunk(
	'user/set',
	async (data: TUserReg, { dispatch }) => {
		api
			.setUser(data)
			.then((res) => dispatch(setUser(res.user)))
			.catch((err) => console.log(err));
	}
);

export const fetchUserUpdate = createAsyncThunk(
	'user/update',
	async (data: TUserReg) => {
		return api.updateUser(data);
	}
);

export const fetchLogOut = createAsyncThunk(
	'user/logout',
	async (_, { dispatch }) => {
		api.logOut().then(() => dispatch(setUser(null)));
	}
);

export const fetchLogIn = createAsyncThunk(
	'user/login',
	async (data: TUserLogIn, { dispatch }) => {
		api
			.logIn(data)
			.then((res) => dispatch(setUser(res.user)))
			.catch((err) => console.log(err));
	}
);

export async function setPswdForgot(data: TUserEmail) {
	try {
		const res = await api.pswdForgot(data);
		return res;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function resetPswd(data: TUserConfirm) {
	try {
		const res = await api.pswdReset(data);
		return res;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function refreshToken() {
	try {
		return await api.refreshToken();
	} catch (err) {
		return Promise.reject(err);
	}
}

export const fetchAddOrder = createAsyncThunk(
	'order/add',
	async (ingredientsArr: string[]) => {
		return api.addOrder(ingredientsArr);
	}
);

// export const fetchGetOrder = createAsyncThunk(
// 	'order/getByNumber',
// 	async (orderNumber: number) => {
// 		return api.getOrder(orderNumber);
// 	}
// );

export async function getOrderByNum(orderNumber: number) {
	try {
		return await api.getOrder(orderNumber);
	} catch (err) {
		return Promise.reject(err);
	}
}

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
				.then((res) => dispatch(setUser(res ? res.user : null)))
				// тут не нужно обрабатывать возможную ошибку
				.finally(() => dispatch(setIsAuth(true)));
		} else {
			dispatch(setIsAuth(true));
		}
	}
);
