import burgerIngredientsReducer from './burgerIngredientsSlice';
import { describe, expect } from '@jest/globals';

const itemTst = {
	_id: '',
	name: 'nametst',
	type: 'typetst',
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	price: 0,
	image: 'imgA',
	image_mobile: 'imgB',
	image_large: 'imgC',
	count: 0,
	__v: 0,
};

describe('срез burgerIngredients в хранилище', () => {
	it('должен иметь начальное состояние', () => {
		const initialState = burgerIngredientsReducer(undefined, {});
		expect(initialState).toEqual({
			data: [],
			status: 'loading',
			error: '',
		});
	});

	it('clear_counts должен обнулять все счетчики', () => {
		let testState = {
			data: [
				{ ...itemTst, _id: 'item1', count: 1 },
				{ ...itemTst, _id: 'item2', count: 2 },
			],
			status: 'loading',
			error: '',
		};
		const action = { type: 'burgerIngredients/clear_counts' };
		const state = burgerIngredientsReducer(testState, action);
		expect(state.data[0].count).toBe(0);
		expect(state.data[1].count).toBe(0);
	});

	it('set_count должен изменять заданный счетчик на указанную величину', () => {
		let testState = {
			data: [
				{ ...itemTst, _id: 'item1', count: 1 },
				{ ...itemTst, _id: 'item2', count: 2 },
			],
			status: 'loading',
			error: '',
		};
		const action = {
			type: 'burgerIngredients/set_count',
			payload: { id: 'item2', shift: 2 },
		};
		const state = burgerIngredientsReducer(testState, action);
		expect(state.data[0].count).toBe(1);
		expect(state.data[1].count).toBe(4);
	});
});
