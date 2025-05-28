import { RootState } from '@services/store';
export const orders = (state: RootState) => state.lifeOrders.orders;
export const status = (state: RootState) => state.lifeOrders.status;
export const error = (state: RootState) => state.lifeOrders.error;
