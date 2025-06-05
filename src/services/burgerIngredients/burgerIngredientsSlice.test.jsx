import { describe, expect } from '@jest/globals';
import burgerIngredientsReducer, {
	initialState,
	clear_counts,
	set_count,
} from './burgerIngredientsSlice';

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
const ingredientsTst = {
	data: [
		{ ...itemTst, _id: 'item1', count: 1 },
		{ ...itemTst, _id: 'item2', count: 2 },
	],
	status: 'loading',
	error: '',
};

describe('срез burgerIngredients', () => {
	it('должен иметь заданное начальное состояние', () => {
		const state = burgerIngredientsReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('clear_counts должен обнулять все счетчики', () => {
		const action = { type: clear_counts.type };
		const state = burgerIngredientsReducer(ingredientsTst, action);
		expect(state.data[0].count).toBe(0);
		expect(state.data[1].count).toBe(0);
	});

	it('set_count должен изменять заданный счетчик на указанную величину', () => {
		const action = {
			type: set_count.type,
			payload: { id: 'item2', shift: 2 },
		};
		const state = burgerIngredientsReducer(ingredientsTst, action);
		expect(state.data[0].count).toBe(1);
		expect(state.data[1].count).toBe(4);
	});
});
