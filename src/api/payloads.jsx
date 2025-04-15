const INGREDIENTS_SERVER_URL =
	'https://norma.nomoreparties.space/api/ingredients';
const ORDER_SERVER_URL = 'https://norma.nomoreparties.space/api/orders';

const getResponce = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
	return fetch(INGREDIENTS_SERVER_URL).then(getResponce);
};

export const addOrder = (ingredientsArr) => {
	return fetch(ORDER_SERVER_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ingredients: ingredientsArr }),
	}).then(getResponce);
};
