import { describe, expect } from '@jest/globals';
import orderDetailsReducer, {
	initialState,
	clear,
	set_visible,
} from './orderDetailsSlice';

const prevState = {
	...initialState,
	name: 'название',
	number: 123321,
	visible: true,
};

describe('срез orderDetails', () => {
	it('должен иметь заданное начальное состояние', () => {
		const state = orderDetailsReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('clear должен правильно обнулять заказ', () => {
		const action = { type: clear.type };
		const state = orderDetailsReducer(prevState, action);
		expect(state).toEqual({ ...initialState, visible: prevState.visible });
	});

	it('set_visible должен обновлять свойство visible', () => {
		const action = { type: set_visible.type, payload: false };
		const state = orderDetailsReducer(prevState, action);
		expect(state).toEqual({ ...prevState, visible: false });
	});
});
