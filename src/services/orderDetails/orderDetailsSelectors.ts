import { RootState } from '@services/store';
export const name = (state: RootState) => state.orderDetails.name;
export const number = (state: RootState) => state.orderDetails.number;
export const status = (state: RootState) => state.orderDetails.status;
export const error = (state: RootState) => state.orderDetails.error;
export const visible = (state: RootState) => state.orderDetails.visible;
