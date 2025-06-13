import { describe, expect } from '@jest/globals';
import burgerConsructorReducer, {
	initialState,
	set_bun,
	clear,
	del_ingredient,
	add_ingredient,
	move_ingredient,
} from './burgerConsructorSlice';
import { C_PREFIX } from '@utils/customConfig';

const burgerTst = {
	bun: 'bun',
	filling: [
		{ key: C_PREFIX + 'k0001', id: 'item01' },
		{ key: C_PREFIX + 'k0002', id: 'item02' },
		{ key: C_PREFIX + 'k0003', id: 'item03' },
	],
};

describe('срез burgerConsructor', () => {
	it('должен иметь заданное начальное состояние', () => {
		const state = burgerConsructorReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('set_bun должен обновлять свойство bun', () => {
		const action = { type: set_bun.type, payload: 'bun01' };
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.bun).toBe('bun01');
		expect(state.filling).toEqual(burgerTst.filling);
	});

	it('clear должен правильно очищать хранилище', () => {
		const action = { type: clear.type };
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state).toEqual(initialState);
	});

	it('del_ingredient должен удалять строку начинки бургера', () => {
		const action = {
			type: del_ingredient.type,
			payload: C_PREFIX + 'k0002',
		};
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.filling[1].key).toBe(C_PREFIX + 'k0003');
	});

	it('add_ingredient должен добавлять строку начинки бургера над строкой приемника', () => {
		const action = {
			type: add_ingredient.type,
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
			type: move_ingredient.type,
			payload: { source: C_PREFIX + 'k0003', resiver: C_PREFIX + 'k0001' },
		};
		const state = burgerConsructorReducer(burgerTst, action);
		expect(state.filling[0].key).toBe(C_PREFIX + 'k0001');
		expect(state.filling[1].key).toBe(C_PREFIX + 'k0003');
		expect(state.filling[2].key).toBe(C_PREFIX + 'k0002');
	});
});
