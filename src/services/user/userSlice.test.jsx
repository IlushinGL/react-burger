import { describe, expect } from '@jest/globals';
import userReducer, { initialState, setUser, setIsAuth } from './userSlice';

// import { fetchUserUpdate } from '@services/actionsThunk';
// import thunkMiddleware from 'redux-thunk';
// import { configureStore } from 'redux-mock-store';
// const mockStore = configureStore([thunkMiddleware]);
// it('должен обновляться асинхронно', () => {
// 		const store = mockStore(initialState);
// 		const userReg = { ...user, password: '654321' };
// 		store.dispatch(fetchUserUpdate(userReg));
// 		expect(state).toEqual({ ...initialState, status: 'loading', error: '' });
// 	});

const user = { name: 'tstName', email: 'tstA@tstB.tstC' };

describe('срез user', () => {
	it('должен иметь заданное начальное состояние', () => {
		const state = userReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setUser должен обновлять поле user', () => {
		const action = { type: setUser.type, payload: user };
		const state = userReducer(initialState, action);
		expect(state).toEqual({ ...initialState, user: user });
	});

	it('setIsAuth должен обновлять поле isAuth', () => {
		const action = { type: setIsAuth.type, payload: true };
		const state = userReducer(initialState, action);
		expect(state).toEqual({ ...initialState, isAuth: true });
	});
});
