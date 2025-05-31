import { RootState } from '@services/store';
export const user = (state: RootState) => state.currentUser.user;
export const status = (state: RootState) => state.currentUser.status;
export const error = (state: RootState) => state.currentUser.error;
export const isAuth = (state: RootState) => state.currentUser.isAuth;
