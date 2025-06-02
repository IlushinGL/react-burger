import ingredientDetailsReducer from './ingredientDetailsSlice';
import { describe, expect } from '@jest/globals';

describe('срез ingredientDetails в хранилище', () => {
	it('должен иметь начальное состояние', () => {
		const initialState = ingredientDetailsReducer(undefined, {});
		expect(initialState).toEqual({
			data: null,
		});
	});

	it('должен обновлять свойство data', () => {
		const data = [
			{
				_id: 'idtst',
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
			},
		];
		const action = { type: 'ingredientDetails/set', payload: data };
		const state = ingredientDetailsReducer(undefined, action);
		expect(state.data).toEqual(data);
	});
});
