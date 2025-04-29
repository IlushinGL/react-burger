import { configureStore } from '@reduxjs/toolkit';

import burgerIngrediensReduser from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReduser from './burgerConsructor/burgerConsructorSlice';
import burgerIngredientsDetailsReduser from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReduser from './orderDetails/orderDetailsSlice';
import currentUserReduser from './user/userSlice';

export const store = configureStore({
	reducer: {
		burgerIngredients: burgerIngrediensReduser,
		burgerConstructor: burgerConstructorReduser,
		ingredientDetails: burgerIngredientsDetailsReduser,
		orderDetails: orderDetailsReduser,
		currentUser: currentUserReduser,
	},
	// middleware: getDefaultMiddleware,
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState: preloadedState,
	// enhancers: [customEnhancer],
});
