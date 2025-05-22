import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import burgerIngrediensReduser from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReduser from './burgerConsructor/burgerConsructorSlice';
import burgerIngredientsDetailsReduser from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReduser from './orderDetails/orderDetailsSlice';
import userReduser from './user/userSlice';

const store = configureStore({
	reducer: {
		burgerIngredients: burgerIngrediensReduser,
		burgerConstructor: burgerConstructorReduser,
		ingredientDetails: burgerIngredientsDetailsReduser,
		orderDetails: orderDetailsReduser,
		currentUser: userReduser,
	},
	// middleware: getDefaultMiddleware,
	// preloadedState: preloadedState,
	// enhancers: [customEnhancer],
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
