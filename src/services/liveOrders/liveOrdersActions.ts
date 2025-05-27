import { createAction } from '@reduxjs/toolkit';
import { Data } from '@utils/type-orders-stack';

export const connect = createAction<string, 'socket/connect'>('socket/connect');
export const disconnect = createAction('socket/disconnect');

export const onConnecting = createAction('socket/onConnecting');
export const onOpen = createAction('socket/onOpen');
export const onClose = createAction('socket/onClose');
export const onError = createAction<string, 'socket/onError'>('socket/onError');
export const onMessage = createAction<Data, 'socket/onMessage'>(
	'socket/onMessage'
);
