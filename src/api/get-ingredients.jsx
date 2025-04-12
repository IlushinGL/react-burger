const INGREDIENTS_DATA_URL =
	'https://norma.nomoreparties.space/api/ingredients';

const getResponce = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
	return fetch(INGREDIENTS_DATA_URL).then(getResponce);
};
