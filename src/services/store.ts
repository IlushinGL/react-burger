import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import burgerIngrediensReducer from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConsructor/burgerConsructorSlice';
import burgerIngredientsDetailsReducer from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from './orderDetails/orderDetailsSlice';
import userReducer from './user/userSlice';
import liveOrdersReducer from './liveOrders/liveOrdersSlice';
import liveMyOrdersReducer from './liveMyOrders/liveMyOrdersSlice';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect,
	disconnect,
	onConnecting,
	onClose,
	onOpen,
	onError,
	onMessage,
} from './liveOrders/liveOrdersActions';
import {
	connectMy,
	disconnectMy,
	onConnectingMy,
	onCloseMy,
	onOpenMy,
	onErrorMy,
	onMessageMy,
} from './liveMyOrders/liveMyOrdersActions';

const rootReducer = combineReducers({
	burgerIngredients: burgerIngrediensReducer,
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: burgerIngredientsDetailsReducer,
	orderDetails: orderDetailsReducer,
	currentUser: userReducer,
	liveOrders: liveOrdersReducer,
	liveMyOrders: liveMyOrdersReducer,
});

const liveOrdersMiddleware = socketMiddleware({
	connect: connect,
	disconnect: disconnect,
	onConnecting: onConnecting,
	onClose: onClose,
	onOpen: onOpen,
	onError: onError,
	onMessage: onMessage,
});
const liveMyOrdersMiddleware = socketMiddleware(
	{
		connect: connectMy,
		disconnect: disconnectMy,
		onConnecting: onConnectingMy,
		onClose: onCloseMy,
		onOpen: onOpenMy,
		onError: onErrorMy,
		onMessage: onMessageMy,
	},
	true
);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(liveOrdersMiddleware, liveMyOrdersMiddleware),
	// preloadedState: preloadedState,
	// enhancers: [customEnhancer],
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
