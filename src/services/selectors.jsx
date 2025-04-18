import { all as getIngredienDetailesData } from './ingredientDetails/ingredientDetailsSelectors';
import {
	all as getBurgerIngredientsAll,
	byType as getBurgerIngredientsByType,
	total as getBurgerIngredientsTotal,
	status as getBurgerIngredientsStatus,
	error as getBurgerIngredientsError,
} from './burgerIngredients/burgerIngredientsSelectors';
import {
	all as getBurgerConstructorData,
	list as getBurgerConstructorlist,
	get_byId as getBurgerConstructorById,
} from './burgerConsructor/burgerConsructorSelectors';
import {
	name as getOrderDetailsName,
	number as getOrderDetailsNumber,
	status as getOrderDetailsStatus,
	error as getOrderDetailsError,
	visible as getOrderDetailsVisible,
} from './orderDetails/orderDetailsSelectors';

export const selectors = {
	ingredientDetails: {
		get_data: getIngredienDetailesData,
	},
	orderDetails: {
		get_name: getOrderDetailsName,
		get_number: getOrderDetailsNumber,
		get_status: getOrderDetailsStatus,
		get_error: getOrderDetailsError,
		get_visible: getOrderDetailsVisible,
	},
	burgerIngredients: {
		get_all: getBurgerIngredientsAll,
		get_byType: getBurgerIngredientsByType,
		get_status: getBurgerIngredientsStatus,
		get_error: getBurgerIngredientsError,
		get_total: getBurgerIngredientsTotal,
	},
	burgerConstructor: {
		get_data: getBurgerConstructorData,
		get_list: getBurgerConstructorlist,
		get_byId: getBurgerConstructorById,
	},
};
