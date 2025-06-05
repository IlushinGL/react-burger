import { describe, expect } from '@jest/globals';
import ingredientDetailsReducer, {
	initialState,
	set,
} from './ingredientDetailsSlice';

describe('срез ingredientDetails', () => {
	it('должен иметь заданное начальное состояние', () => {
		const state = ingredientDetailsReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('set должен обновлять свойство data', () => {
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
		const action = { type: set.type, payload: data };
		const state = ingredientDetailsReducer(initialState, action);
		expect(state.data).toEqual(data);
	});
});
