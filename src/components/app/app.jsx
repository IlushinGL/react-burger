import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useState, useEffect } from 'react';
import main from './app.module.scss';

import { BURGER_DATA } from '@utils/burger-data';

import Preloader from '@components/preloader/preloader';
import { actions } from '@services/actions';
import { selectors } from '@services/selectors';
import { getIngredients } from '../../api/get-ingredients';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

export const App = () => {
	const dispatch = useDispatch();
	const loadingState = useSelector(selectors.loading.get);
	const errorState = useSelector(selectors.error.get);
	const burgerIngrediensData = useSelector(selectors.burgerIngredients.get_all);
	const burgerConstructorData = useSelector(selectors.burgerConstructor.get);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		dispatch(actions.loading.set(true));
		dispatch(actions.error.set(''));
		getIngredients(handleIgredientsLoading);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleIgredientsLoading(ingredients) {
		if (!ingredients) {
			dispatch(actions.loading.set(true));
			dispatch(actions.error.set(''));
			return;
		}
		if (ingredients instanceof Error) {
			dispatch(actions.error.set(ingredients.message));
			dispatch(actions.loading.set(false));
			dispatch(actions.burgerIngredients.set([]));
			return;
		}

		dispatch(actions.error.set(''));
		dispatch(actions.loading.set(false));
		dispatch(actions.burgerIngredients.set(ingredients));
		dispatch(actions.burgerConstructor.set(BURGER_DATA));
	}

	function handleOnCloseErr() {
		getIngredients(handleIgredientsLoading);
	}

	function handleOnCloseIngredient() {
		setSelectedIngredient(null);
	}

	function handleOnCloseOrder() {
		setSelectedOrder(null);
	}

	function handleOnClickIngredient(item) {
		setSelectedIngredient(item);
	}

	function handleOnClickOrder() {
		setSelectedOrder(burgerConstructorData.data);
	}

	if (loadingState) {
		// console.log(loadingState, errorState);
		return <Preloader box={160} visible={loadingState} />;
	}

	if (errorState) {
		return (
			<Modal text={'Ошибка при запросе данных'} onClose={handleOnCloseErr}>
				<ErrDetailes item={errorState} />
			</Modal>
		);
	}

	return (
		<div className={main.main}>
			<div className={main.conteiner}>
				<AppHeader />
				<main className={main.data}>
					<BurgerIngredients
						data={burgerIngrediensData}
						onClick={handleOnClickIngredient}
					/>
					<BurgerConstructor onClick={handleOnClickOrder} />
				</main>
			</div>
			<Modal text={'Детали ингредиента'} onClose={handleOnCloseIngredient}>
				<IngredientDetailes item={selectedIngredient} />
			</Modal>
			<Modal text={' '} onClose={handleOnCloseOrder}>
				<OrderDetailes item={selectedOrder} />
			</Modal>
		</div>
	);
};
