export const C_PREFIX = 'igl_';
export const APP_PATH = {
	home: '/',
	login: '/login',
	register: '/register',
	forgotPswd: '/forgot-password',
	resetPswd: '/reset-password',
	list: '/list',
	profile: '/profile',
	ingredientsPath: '/ingredients',
	ingredientPattern: '/ingredients/:id',
	ordersStack: '/feed',
	ordersStackPattern: '/feed/:number',
	ordersUserStack: '/profile/orders',
	ordersUserStackPattern: '/profile/orders/:number',
};
export const ORDER_STATUS_TXT: { [key: string]: string } = {
	pending: 'Готовится',
	done: 'Выполнен',
	created: 'Создан',
};
