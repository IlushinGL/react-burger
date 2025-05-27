import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import burgerIngrediensReducer from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConsructor/burgerConsructorSlice';
import burgerIngredientsDetailsReducer from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from './orderDetails/orderDetailsSlice';
import userReducer from './user/userSlice';
import liveOrdersReducer from './liveOrders/liveOrdersSlice';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect,
	disconnect,
	onConnecting,
	onError,
	onMessage,
} from './liveOrders/liveOrdersActions';

const rootReducer = combineReducers({
	burgerIngredients: burgerIngrediensReducer,
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: burgerIngredientsDetailsReducer,
	orderDetails: orderDetailsReducer,
	currentUser: userReducer,
	lifeOrders: liveOrdersReducer,
});

// const rootReducer = {
// 	burgerIngredients: burgerIngrediensReducer,
// 	burgerConstructor: burgerConstructorReducer,
// 	ingredientDetails: burgerIngredientsDetailsReducer,
// 	orderDetails: orderDetailsReducer,
// 	currentUser: userReducer,
// 	lifeOrders: liveOrdersReducer,
// };

const liveOrdersMiddleware = socketMiddleware({
	connect: connect,
	disconnect: disconnect,
	onConnecting: onConnecting,
	onError: onError,
	onMessage: onMessage,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(liveOrdersMiddleware),
	// preloadedState: preloadedState,
	// enhancers: [customEnhancer],
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
