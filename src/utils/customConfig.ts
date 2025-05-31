export const LIVE_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const LIVE_MY_ORDERS_URL =
	'wss://norma.nomoreparties.space/orders?token=' +
	String(localStorage.getItem('accessToken')).replace('Bearer ', '');
export const RECONNECT_PERIOD = 3000;
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
