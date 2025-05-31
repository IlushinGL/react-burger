import { set as ingredientDetailsDataSet } from './ingredientDetails/ingredientDetailsSlice';
import {
	clear as orderDetailsClear,
	set_visible as orderDetailsSetVisible,
} from './orderDetails/orderDetailsSlice';
import {
	clear_counts as burgerIngredientsReset,
	set_count as burgerIngredientsSetCount,
} from './burgerIngredients/burgerIngredientsSlice';
import {
	clear as burgerConstructorClear,
	set_bun as burgerConstructorSetBun,
	add_ingredient as burgerConstructorAddIngredient,
	move_ingredient as burgerConstructorMoveIngredient,
	del_ingredient as burgerConstructorDelIngredient,
} from './burgerConsructor/burgerConsructorSlice';
import {
	setUser as userSet,
	setIsAuth as userSetIsAuth,
} from './user/userSlice';

export const actions = {
	ingredientDetails: {
		set: ingredientDetailsDataSet,
	},
	orderDetails: {
		reset: orderDetailsClear,
		visible: orderDetailsSetVisible,
	},
	burgerIngredients: {
		reset: burgerIngredientsReset,
		set_count: burgerIngredientsSetCount,
	},
	burgerConstructor: {
		reset: burgerConstructorClear,
		set_bun: burgerConstructorSetBun,
		add_ingredient: burgerConstructorAddIngredient,
		move_ingredient: burgerConstructorMoveIngredient,
		del_ingredient: burgerConstructorDelIngredient,
	},
	currentUser: {
		setUser: userSet,
		setIsAuth: userSetIsAuth,
	},
};
