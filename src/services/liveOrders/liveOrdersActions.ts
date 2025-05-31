import { createAction } from '@reduxjs/toolkit';
import { Data } from '@utils/type-orders-stack';

export const connect = createAction<string, 'liveOrders/connect'>(
	'liveOrders/connect'
);
export const disconnect = createAction('liveOrders/disconnect');

export const onConnecting = createAction('liveOrders/onConnecting');
export const onOpen = createAction('liveOrders/onOpen');
export const onClose = createAction('liveOrders/onClose');
export const onError = createAction<string, 'liveOrders/onError'>(
	'liveOrders/onError'
);
export const onMessage = createAction<Data, 'liveOrders/onMessage'>(
	'liveOrders/onMessage'
);
