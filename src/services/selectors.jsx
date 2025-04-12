import { getLoadingData } from './loading/loadingSelectors';
import { getErrData } from './err/errSelectors';
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

export const selectors = {
	loading: {
		get: getLoadingData,
	},
	error: {
		get: getErrData,
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
