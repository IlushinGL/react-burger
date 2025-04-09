import { getLoadingData } from './loading/loadingSelectors';
import { getErrData } from './err/errSelectors';
import {
	all as getBurgerIngredientsAll,
	byType as getBurgerIngredientsByType,
} from './burgerIngredients/burgerIngredientsSelectors';
import {
	all as getBurgerConstructorData,
	total as getBurgerConstructorTotal,
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
	},
	burgerConstructor: {
		get: getBurgerConstructorData,
		get_byId: getBurgerConstructorById,
		total: getBurgerConstructorTotal,
	},
};
