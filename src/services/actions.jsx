import { set as ingredientDetailsDataSet } from './ingredientDetails/ingredientDetailsSlice';
import { set_visible as orderDetailsSetVisible } from './orderDetails/orderDetailsSlice';
import { set_count as burgerIngredientsSetCount } from './burgerIngredients/burgerIngredientsSlice';
import {
	set_bun as burgerConstructorSetBun,
	add_ingredient as burgerConstructorAddIngredient,
	move_ingredient as burgerConstructorMoveIngredient,
	del_ingredient as burgerConstructorDelIngredient,
} from './burgerConsructor/burgerConsructorSlice';

export const actions = {
	ingredientDetails: {
		set: ingredientDetailsDataSet,
	},
	orderDetails: {
		visible: orderDetailsSetVisible,
	},
	burgerIngredients: {
		set_count: burgerIngredientsSetCount,
	},
	burgerConstructor: {
		set_bun: burgerConstructorSetBun,
		add_ingredient: burgerConstructorAddIngredient,
		move_ingredient: burgerConstructorMoveIngredient,
		del_ingredient: burgerConstructorDelIngredient,
	},
};
