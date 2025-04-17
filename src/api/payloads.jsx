const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_EP = '/ingredients';
const ORDERS_EP = '/orders';

const getResponce = (res) => {
	if (res.ok) {
		return res.json();
	}
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
