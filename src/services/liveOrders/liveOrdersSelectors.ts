import { RootState } from '@services/store';
export const orders = (state: RootState) => state.liveOrders.orders;
export const status = (state: RootState) => state.liveOrders.status;
export const error = (state: RootState) => state.liveOrders.error;
