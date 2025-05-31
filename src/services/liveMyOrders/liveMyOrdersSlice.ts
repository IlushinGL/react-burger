import { createSlice } from '@reduxjs/toolkit';
import { WebSocketStatus } from '@utils/type-orders-stack';
import { TOrders } from '@utils/types';
import {
	onCloseMy,
	onConnectingMy,
	onErrorMy,
	onMessageMy,
	onOpenMy,
} from './liveMyOrdersActions';

export interface IordersStore {
	status: WebSocketStatus;
	orders: TOrders | null;
	error: string | null;
}

const initialState: IordersStore = {
	status: WebSocketStatus.OFFLINE,
	orders: null,
	error: null,
};

const liveMyOrdersSlice = createSlice({
	name: 'liveMyOrders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnectingMy, (state) => {
				state.status = WebSocketStatus.CONNECTING;
			})
			.addCase(onOpenMy, (state) => {
				state.status = WebSocketStatus.ONLINE;
			})
			.addCase(onCloseMy, (state) => {
				state.status = WebSocketStatus.OFFLINE;
			})
			.addCase(onErrorMy, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessageMy, (state, action) => {
				state.orders = action.payload as unknown as TOrders;
			});
	},
});

export default liveMyOrdersSlice.reducer;
