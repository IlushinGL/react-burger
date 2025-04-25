import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api';

export const fetchUserSet = createAsyncThunk('user/set', async (data) => {
	return api.setUser(data);
});

export const fetchAddOrder = createAsyncThunk(
	'order/add',
	async (ingredientsArr) => {
		return api.addOrder(ingredientsArr);
	}
);

export const fetchAllIngedients = createAsyncThunk(
	'ingrediens/getAll',
	async () => {
		return api.getIngredients();
	}
);
