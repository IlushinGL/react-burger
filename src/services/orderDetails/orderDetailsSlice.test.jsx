import orderDetailsReducer from './orderDetailsSlice';
import { describe, expect } from '@jest/globals';

describe('срез orderDetails в хранилище', () => {
	it('должен иметь начальное состояние', () => {
		const initialState = orderDetailsReducer(undefined, {});
		expect(initialState).toEqual({
			name: 'новый заказ',
			number: '...',
			status: 'idle',
			error: '',
			visible: false,
		});
	});

	it('должен правильно обновляться при очистке', () => {
		const action = { type: 'orderDetails/clear' };
		const state = orderDetailsReducer(undefined, action);
		expect(state.name).toBe('новый заказ');
		expect(state.number).toBe('...');
	});

	it('должен обновлять свойство visible', () => {
		const action = { type: 'orderDetails/set_visible', payload: true };
		const state = orderDetailsReducer(undefined, action);
		expect(state.visible).toBe(true);
	});
});
