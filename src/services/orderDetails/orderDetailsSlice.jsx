import { createSlice } from '@reduxjs/toolkit';
import { fetchAddOrder } from '@services/actionsThunk';

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState: {
		name: 'новый заказ',
		number: '...',
		status: 'idle',
		error: '',
		visible: false,
	},
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
				if (action.payload.success) {
					state.status = 'idle';
					state.error = '';
					state.name = action.payload.name;
					state.number = action.payload.order.number;
				} else {
					state.status = 'error';
					state.error = action.payload.message;
				}
			})
			.addCase(fetchAddOrder.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const { clear, set_visible } = orderDetailsSlice.actions; // генераторы действий
export default orderDetailsSlice.reducer;
