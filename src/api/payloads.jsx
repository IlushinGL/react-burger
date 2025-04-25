const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_EP = '/ingredients';
const ORDERS_EP = '/orders';
const AUTH_USER_EP = '/auth/user';
const AUTH_TOKEN_EP = '/auth/token';
const AUTH_REGISTER_EP = '/auth/register';

const getResponce = (res) => {
	if (res.ok) {
		return res.json();
	}
	// return res.json().then((err) => Promise.reject(err));
	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
	return fetch(BASE_URL + INGREDIENTS_EP).then(getResponce);
};

export const addOrder = (ingredientsArr) => {
	return fetch(BASE_URL + ORDERS_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ingredients: ingredientsArr }),
	}).then(getResponce);
};

export const getCurrentUser = () => {
	return fetchWithRefresh(BASE_URL + AUTH_USER_EP, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		},
	}).then(getResponce);
};

export const setCurrentUser = (data) => {
	return fetch(BASE_URL + AUTH_REGISTER_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			name: data.name,
		}),
	}).then(getResponce);
};

export const refreshToken = () => {
	return fetch(BASE_URL + AUTH_TOKEN_EP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(getResponce)
		.then((refreshData) => {
			if (!refreshData.succes) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await getResponce(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.hesders.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await getResponce(res);
		} else {
			return Promise.reject(err);
		}
	}
};
