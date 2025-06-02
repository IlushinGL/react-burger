import burgerConsructorReducer from './burgerConsructorSlice';
import { describe, expect } from '@jest/globals';
import { C_PREFIX } from '@utils/customConfig';

const burgerTst = {
	bun: 'bun',
	filling: [
		{ key: C_PREFIX + 'k0001', id: 'item01' },
		{ key: C_PREFIX + 'k0002', id: 'item02' },
		{ key: C_PREFIX + 'k0003', id: 'item03' },
	],
};

describe('срез burgerConsructor в хранилище', () => {
	it('должен иметь начальное состояние', () => {
		const initialState = burgerConsructorReducer(undefined, {});
		expect(initialState).toEqual({
			bun: '',
			filling: [],
		});
	});

	it('set_bun должен обновлять свойство bun', () => {
		const action = { type: 'burgerConsructor/set_bun', payload: 'bun01' };
		const state = burgerConsructorReducer(undefined, action);
		expect(state.bun).toBe('bun01');
	});

	it('clear должен правильно обновлять хранилище', () => {
		const action = { type: 'burgerConsructor/clear' };
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.bun).toBe('');
		expect(state.filling).toEqual([]);
	});

	it('del_ingredient должен удалять строку начинки бургера', () => {
		const action = {
			type: 'burgerConsructor/del_ingredient',
			payload: C_PREFIX + 'k0002',
		};
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.filling[1].key).toBe(C_PREFIX + 'k0003');
	});

	it('add_ingredient должен добавлять строку начинки бургера над строкой приемника', () => {
		const action = {
			type: 'burgerConsructor/add_ingredient',
			payload: { source: 'item02', resiver: C_PREFIX + 'k0002' },
		};
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.filling[0].key).toBe(C_PREFIX + 'k0001');
		expect(state.filling[1].id).toBe('item02');
		expect(state.filling[2].key).toBe(C_PREFIX + 'k0002');
		expect(state.filling[3].key).toBe(C_PREFIX + 'k0003');
	});

	it('move_ingredient в начинках бургера должен помешать строку источника под приемником', () => {
		const action = {
			type: 'burgerConsructor/move_ingredient',
			payload: { source: C_PREFIX + 'k0003', resiver: C_PREFIX + 'k0001' },
		};
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.filling[0].key).toBe(C_PREFIX + 'k0001');
		expect(state.filling[1].key).toBe(C_PREFIX + 'k0003');
		expect(state.filling[2].key).toBe(C_PREFIX + 'k0002');
	});
});
