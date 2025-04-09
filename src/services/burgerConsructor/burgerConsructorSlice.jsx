import { createSlice, nanoid } from '@reduxjs/toolkit';

const burgerConsructorSlice = createSlice({
	name: 'burgerConsructor',
	initialState: {
		data: {
			order: { number: '' },
			name: '',
			bun: '',
			success: false,
			filling: [],
		},
	},
	reducers: {
		set(state, action) {
			const filling = action.payload.filling.map((item) => {
				return { key: 'igl_' + nanoid(), id: item };
			});
			state.data = { ...action.payload, filling: filling };
		},
		set_bun(state, action) {
			state.data.bun = action.payload;
		},
		add_ingredient(state, action) {
			// payload = {source: id ингредиента, resiver: key строки заказа }
			// помещает над ресивером
			const currentFilling = state.data.filling;
			const index = currentFilling.findIndex(
				(item) => item.key === action.payload.resiver
			);
			if (index === -1) {
				return;
			}
			currentFilling.splice(index, 0, {
				key: 'igl_' + nanoid(),
				id: action.payload.source,
			});
		},
		move_ingredient(state, action) {
			// payload = {source: key перемещаемой строки заказа, resiver: key строки заказа }
			// помещает под ресивером
			const currentFilling = state.data.filling;
			const indexFrom = currentFilling.findIndex(
				(item) => item.key === action.payload.source
			);
			const indexTo = currentFilling.findIndex(
				(item) => item.key === action.payload.resiver
			);
			if (indexFrom === -1 || indexTo === -1) {
				return;
			}
			const itemMoved = currentFilling[indexFrom];
			if (indexTo < indexFrom) {
				for (let id = indexFrom; id > indexTo + 1; id--) {
					currentFilling[id] = currentFilling[id - 1];
				}
				currentFilling[indexTo + 1] = itemMoved;
			} else if (indexTo > indexFrom) {
				for (let id = indexFrom; id < indexTo; id++) {
					currentFilling[id] = currentFilling[id + 1];
				}
				currentFilling[indexTo] = itemMoved;
			}
		},
		del_ingredient(state, action) {
			const currentFilling = state.data.filling;
			const index = currentFilling.findIndex(
				(item) => item.key === action.payload
			);
			if (index === -1) {
				return;
			}
			currentFilling.splice(index, 1);
			// state.data.filling = currentFilling;
		},
	},
});

export const { set, set_bun, add_ingredient, del_ingredient, move_ingredient } =
	burgerConsructorSlice.actions; // генераторы действий
export default burgerConsructorSlice.reducer;
