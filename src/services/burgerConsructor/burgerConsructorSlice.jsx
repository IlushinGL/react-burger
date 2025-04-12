import { createSlice, nanoid } from '@reduxjs/toolkit';

const burgerConsructorSlice = createSlice({
	name: 'burgerConsructor',
	initialState: {
		bun: '',
		filling: [],
	},
	reducers: {
		set_bun(state, action) {
			state.bun = action.payload;
		},
		add_ingredient(state, action) {
			// payload = {source: id ингредиента, resiver: key строки заказа }
			// помещает над ресивером
			const currentFilling = state.filling;
			let index = currentFilling.findIndex(
				(item) => item.key === action.payload.resiver
			);
			if (index === -1) {
				index = 0;
			}
			currentFilling.splice(index, 0, {
				key: 'igl_' + nanoid(),
				id: action.payload.source,
			});
		},
		move_ingredient(state, action) {
			// payload = {source: key перемещаемой строки заказа, resiver: key строки заказа }
			// помещает под ресивером
			const currentFilling = state.filling;
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
			const currentFilling = state.filling;
			const index = currentFilling.findIndex(
				(item) => item.key === action.payload
			);
			if (index === -1) {
				return;
			}
			currentFilling.splice(index, 1);
		},
	},
});

export const { set_bun, add_ingredient, del_ingredient, move_ingredient } =
	burgerConsructorSlice.actions; // генераторы действий
export default burgerConsructorSlice.reducer;
