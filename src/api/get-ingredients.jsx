import { INGREDIENTS_DATA_URL } from '@utils/ingredients-data';

export async function getIngredients(onLoad) {
	const name = 'getIngredients';
	onLoad(null);
	try {
		const res = await fetch(INGREDIENTS_DATA_URL);
		if (res.ok) {
			const data = await res.json();
			if (data.success) {
				onLoad(data.data);
			} else {
				onLoad(
					new Error(`Ошибка:500 Модуль:${name} Сервер:${INGREDIENTS_DATA_URL}`)
				);
			}
		} else {
			onLoad(
				new Error(
					`Ошибка:${res.status} Модуль:${name} Сервер:${INGREDIENTS_DATA_URL}`
				)
			);
		}
	} catch (err) {
		onLoad(err);
	}
}
