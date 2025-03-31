import { INGREDIENTS_DATA_URL } from '@utils/ingredients-data';

export async function getIngredients(onLoad) {
	const name = 'getIngredients';
	onLoad({ igredients: null, loading: true });
	try {
		const res = await fetch(INGREDIENTS_DATA_URL);
		if (res.ok) {
			const data = await res.json();
			if (data.success) {
				onLoad({ ingredients: data.data, loading: false });
			} else {
				onLoad({
					ingredients: new Error(
						`Ошибка:500 Модуль:${name} Сервер:${INGREDIENTS_DATA_URL}`
					),
					loading: false,
				});
			}
		} else {
			onLoad({
				ingredients: new Error(
					`Ошибка:${res.status} Модуль:${name} Сервер:${INGREDIENTS_DATA_URL}`
				),
				loading: false,
			});
		}
	} catch (err) {
		onLoad({
			ingredients: err,
			loading: false,
		});
	}
}
