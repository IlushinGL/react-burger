import { createSlice } from '@reduxjs/toolkit';
import { WebSocketStatus } from '@utils/type-orders-stack';
import { TOrders } from '@utils/types';
import {
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from './liveOrdersActions';

export type TordersStore = {
	status: WebSocketStatus;
	orders: TOrders | null;
	error: string | null;
};

const initialState: TordersStore = {
	status: WebSocketStatus.OFFLINE,
	orders: null,
	error: null,
};

const liveOrdersSlice = createSlice({
	name: 'liveOrders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = WebSocketStatus.CONNECTING;
			})
			.addCase(onOpen, (state) => {
				state.status = WebSocketStatus.ONLINE;
			})
			.addCase(onClose, (state) => {
				state.status = WebSocketStatus.OFFLINE;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload.data;
			});
	},
	selectors: {
		getOrders: (state: TordersStore) => state.orders,
		getStatus: (state: TordersStore) => state.status,
		getError: (state: TordersStore) => state.error,
	},
});

export const { getOrders, getStatus, getError } = liveOrdersSlice.selectors; // селекторы
export default liveOrdersSlice.reducer;
