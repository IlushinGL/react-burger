const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_EP = '/ingredients';
const ORDERS_EP = '/orders';
const AUTH_USER_EP = '/auth/user';
const AUTH_LOGIN_EP = '/auth/login';
const AUTH_LOGOUT_EP = '/auth/logout';
const AUTH_TOKEN_EP = '/auth/token';
const AUTH_REGISTER_EP = '/auth/register';
const AUTH_PSWDFORGOT_EP = '/password-reset';
const AUTH_PSWDRESET_EP = '/password-reset/reset';

import {
	TAnsAuth,
	TAnsInfo,
	TAnsToken,
	TAnsUser,
	TUserConfirm,
	TUserEmail,
	TUserLogIn,
	TUserReg,
	TIngredient,
} from './types';

const getResponce = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
	// return Promise.reject(`Ошибка ${res.status}`);
};

const getIngredients = (): Promise<TIngredient[]> => {
	return fetch(BASE_URL + INGREDIENTS_EP).then((res) =>
		getResponce<TIngredient[]>(res)
	);
};

const logOut = (): Promise<TAnsInfo> => {
	localStorage.removeItem('isForgot');
	return fetch(BASE_URL + AUTH_LOGOUT_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then((res) => getResponce<TAnsInfo>(res))
		.then((answer) => {
			if (!answer.success) {
				return Promise.reject(answer);
			}
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			return answer;
		});
};

const logIn = (data: TUserLogIn): Promise<TAnsAuth> => {
	localStorage.removeItem('isForgot');
	return fetch(BASE_URL + AUTH_LOGIN_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: data.email,
			password: data.password,
		}),
	})
		.then((res) => getResponce<TAnsAuth>(res))
		.then((answer) => {
			if (!answer.success) {
				return Promise.reject(answer);
			}
			localStorage.setItem('refreshToken', answer.refreshToken);
			localStorage.setItem('accessToken', answer.accessToken);
			return answer;
		});
};

const pswdForgot = (data: TUserEmail): Promise<TAnsInfo> => {
	localStorage.removeItem('isForgot');
	return fetch(BASE_URL + AUTH_PSWDFORGOT_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: data.email,
		}),
	})
		.then((res) => getResponce<TAnsInfo>(res))
		.then((answer) => {
			if (!answer.success) {
				return Promise.reject(answer);
			}
			localStorage.setItem('isForgot', 'true');
			return answer;
		});
};

const pswdReset = (data: TUserConfirm): Promise<TAnsInfo> => {
	return fetch(BASE_URL + AUTH_PSWDRESET_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			password: data.password,
			token: data.code,
		}),
	})
		.then((res) => getResponce<TAnsInfo>(res))
		.then((answer) => {
			if (!answer.success) {
				return Promise.reject(answer);
			}
			localStorage.removeItem('isForgot');
			return answer;
		});
};

const setUser = (data: TUserReg): Promise<TAnsAuth> => {
	return fetch(BASE_URL + AUTH_REGISTER_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			name: data.name,
		}),
	})
		.then((res) => getResponce<TAnsAuth>(res))
		.then((answer) => {
			if (!answer.success) {
				return Promise.reject(answer);
			}
			localStorage.setItem('refreshToken', answer.refreshToken);
			localStorage.setItem('accessToken', answer.accessToken);
			return answer;
		});
};

const addOrder = (ingredientsArr: []): Promise<TAnsInfo> => {
	return fetchWithRefresh(BASE_URL + ORDERS_EP, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ ingredients: ingredientsArr }),
	}).then((res) => getResponce<TAnsInfo>(res));
};

const updateUser = (data: TUserReg): Promise<TAnsUser> => {
	return fetchWithRefresh(BASE_URL + AUTH_USER_EP, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			name: data.name,
		}),
	}).then((res) => getResponce<TAnsUser>(res));
};

const getUser = (): Promise<TAnsUser> => {
	return fetchWithRefresh(BASE_URL + AUTH_USER_EP, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
	}).then((res) => getResponce<TAnsUser>(res));
};

const refreshToken = (): Promise<TAnsToken> => {
	return fetch(BASE_URL + AUTH_TOKEN_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then((res) => getResponce<TAnsToken>(res))
		.then((freshData) => {
			if (!freshData.success) {
				return Promise.reject(freshData);
			}
			localStorage.setItem('refreshToken', freshData.refreshToken);
			localStorage.setItem('accessToken', freshData.accessToken);
			return freshData;
		});
};

const fetchWithRefresh = async (
	url: string,
	options: any
): Promise<Response> => {
	try {
		const res = await fetch(url, options);
		return await getResponce(res);
	} catch (err) {
		const isErr = err instanceof Error;
		if (isErr && err.message === 'jwt expired') {
			const freshData = await refreshToken();
			options.headers.authorization = freshData.accessToken;
			const res = await fetch(url, options);
			return await getResponce<Response>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const api = {
	getIngredients,
	pswdForgot,
	pswdReset,
	addOrder,
	updateUser,
	getUser,
	logOut,
	logIn,
	setUser,
};
