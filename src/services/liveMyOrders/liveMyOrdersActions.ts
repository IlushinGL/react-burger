import { createAction } from '@reduxjs/toolkit';
import { Data } from '@utils/type-orders-stack';

export const connectMy = createAction<string, 'liveMyOrders/connect'>(
	'liveMyOrders/connect'
);
export const disconnectMy = createAction('liveMyOrders/disconnect');

export const onConnectingMy = createAction('liveMyOrders/onConnecting');
export const onOpenMy = createAction('liveMyOrders/onOpen');
export const onCloseMy = createAction('liveMyOrders/onClose');
export const onErrorMy = createAction<string, 'liveMyOrders/onError'>(
	'liveMyOrders/onError'
);
export const onMessageMy = createAction<Data, 'liveMyOrders/onMessage'>(
	'liveMyOrders/onMessage'
);
