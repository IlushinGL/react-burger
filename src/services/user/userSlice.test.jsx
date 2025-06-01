import userReducer from './userSlice';
import { describe, expect } from '@jest/globals';

describe('срез user в хранилище', () => {
	it('должен иметь начальное состояние', () => {
		const initialState = userReducer(undefined, {});
		expect(initialState).toEqual({
			user: null,
			status: 'idle',
			error: '',
			isAuth: false,
		});
	});

	it('должен правильно обновляться при изменении user', () => {
		const user = { name: 'tstName', email: 'tstA@tstB.tstC' };
		const action = { type: 'currentUser/setUser', payload: user };
		const state = userReducer(undefined, action);
		expect(state.user).toEqual(user);
		expect(state.status).toBe('idle');
		expect(state.error).toBe('');
	});

	it('должен обновлять свойство isAuth', () => {
		const action = { type: 'currentUser/setIsAuth', payload: true };
		const state = userReducer(undefined, action);
		expect(state.isAuth).toBe(true);
	});
});
