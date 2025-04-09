import { set as loadingSet } from './loading/loadingSlice';
import { set as errorSet } from './err/errSlice';
import {
	set as burgerIngredientsSet,
	set_count as burgerIngredientsSetCount,
} from './burgerIngredients/burgerIngredientsSlice';
import {
	set as burgerConstructorSet,
	set_bun as burgerConstructorSetBun,
	add_ingredient as burgerConstructorAddIngredient,
	move_ingredient as burgerConstructorMoveIngredient,
	del_ingredient as burgerConstructorDelIngredient,
} from './burgerConsructor/burgerConsructorSlice';

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
		set_bun: burgerConstructorSetBun,
		add_ingredient: burgerConstructorAddIngredient,
		move_ingredient: burgerConstructorMoveIngredient,
		del_ingredient: burgerConstructorDelIngredient,
	},
};
