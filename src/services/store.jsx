import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loading/loadingSlice';
import errorReduser from './err/errSlice';
import burgerIngrediensReduser from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReduser from './burgerConsructor/burgerConsructorSlice';

// const preloadedState = {
// 	loading: false,
// 	error: '',
// 	burgerIngredients: [],
// 	burgerConstructor: [],
// 	ingredientDetails: null,
// 	orderDetails: null,
// };

export const store = configureStore({
	reducer: {
		loading: loadingReducer,
		error: errorReduser,
		burgerIngredients: burgerIngrediensReduser,
		burgerConstructor: burgerConstructorReduser,
	},
	// middleware: getDefaultMiddleware,
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState: preloadedState,
	// enhancers: [customEnhancer],
});
