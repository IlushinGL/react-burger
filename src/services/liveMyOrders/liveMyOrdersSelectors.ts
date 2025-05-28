import { RootState } from '@services/store';
export const orders = (state: RootState) => state.liveMyOrders.orders;
export const status = (state: RootState) => state.liveMyOrders.status;
export const error = (state: RootState) => state.liveMyOrders.error;
