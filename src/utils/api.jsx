const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_EP = '/ingredients';
const ORDERS_EP = '/orders';
const AUTH_USER_EP = '/auth/user';
const AUTH_TOKEN_EP = '/auth/token';
const AUTH_REGISTER_EP = '/auth/register';

const getResponce = (res) => {
	if (typeof res.ok === 'undefined') {
		return res;
	} else if (res.ok) {
		return res.json();
	}
	return res.json().then((err) => Promise.reject(err));
	// return Promise.reject(`Ошибка ${res.status}`);
};

const getIngredients = () => {
	return fetch(BASE_URL + INGREDIENTS_EP).then((res) => getResponce(res));
};

const addOrder = (ingredientsArr) => {
	return fetch(BASE_URL + ORDERS_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ingredients: ingredientsArr }),
	}).then((res) => getResponce(res));
};

const getUser = () => {
	return fetchWithRefresh(BASE_URL + AUTH_USER_EP, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		},
	}).then((res) => getResponce(res));
};

const updateUser = (data) => {
	return fetchWithRefresh(BASE_URL + AUTH_USER_EP, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			name: data.name,
		}),
	}).then((res) => getResponce(res));
};

const setUser = (data) => {
	return fetch(BASE_URL + AUTH_REGISTER_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			name: data.name,
		}),
	}).then((res) => getResponce(res));
};

const refreshToken = () => {
	return fetch(BASE_URL + AUTH_TOKEN_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(getResponce)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await getResponce(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await getResponce(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const api = {
	getIngredients,
	addOrder,
	updateUser,
	getUser,
	setUser,
};
