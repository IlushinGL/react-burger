import { set as loadingSet } from './loading/loadingSlice';
import { set as errorSet } from './err/errSlice';
import {
	set as burgerIngredientsSet,
	set_count as burgerIngredientsSetCount,
} from './burgerIngredients/burgerIngredientsSlice';
import { set as burgerConstructorSet } from './burgerConsructor/burgerConsructorSlice';

export const actions = {
	loading: {
		set: loadingSet,
	},
	error: {
		set: errorSet,
	},
	burgerIngredients: {
		set: burgerIngredientsSet,
		set_count: burgerIngredientsSetCount,
	},
	burgerConstructor: {
		set: burgerConstructorSet,
	},
};
