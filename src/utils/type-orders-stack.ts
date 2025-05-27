import { TOrders } from './types';

export enum WebSocketStatus {
	CONNECTING = 'CONNECTING..',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export enum OrdersStackActionType {
	DATA = 'data',
	INSERT = 'insert',
	DELETE = 'delete',
	UPDATE = 'update',
	MOVE = 'move',
}

export type Data = {
	type: OrdersStackActionType.DATA;
	data: TOrders;
};

// export type OrderAction = Data;
// export type OrderActions = Array<OrderAction>;
