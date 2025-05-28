import { createSlice } from '@reduxjs/toolkit';
import { fetchAddOrder } from '@services/actionsThunk';

export interface IorderDetailsStore {
	name: string;
	number: string | number;
	status: string;
	error: string;
	visible: boolean;
}
const initialState: IorderDetailsStore = {
	name: 'новый заказ',
	number: '...',
	status: 'idle',
	error: '',
	visible: false,
};

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		clear(state) {
			state.name = 'новый заказ';
			state.number = '...';
		},
		set_visible(state, action) {
			state.visible = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAddOrder.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(fetchAddOrder.fulfilled, (state, action) => {
				if (action.payload && action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.name = action.payload.name;
					state.number = action.payload.order.number;
				} else {
					state.status = 'error';
					state.error = 'Не удалось создать заказ.';
				}
			})
			.addCase(fetchAddOrder.rejected, (state) => {
				state.status = 'error';
				state.error = 'Не удалось создать заказ.';
			});
	},
});

export const { clear, set_visible } = orderDetailsSlice.actions; // генераторы действий
export default orderDetailsSlice.reducer;
