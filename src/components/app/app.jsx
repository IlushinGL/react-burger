import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import main from './app.module.scss';

import Preloader from '@components/preloader/preloader';

import { fetchAllIngedients } from '@services/burgerIngredients/burgerIngredientsSlice';
import { fetchAddOrder } from '@services/orderDetails/orderDetailsSlice';

import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

export const App = () => {
	const dispatch = useDispatch();
	const loadingState = useSelector(selectors.burgerIngredients.get_status);
	const errorState = useSelector(selectors.burgerIngredients.get_error);
	const orderDetails = useSelector(selectors.burgerConstructor.get_data);
	const orderDetailsStatus = useSelector(selectors.orderDetails.get_status);
	const selectedIngredient = useSelector(selectors.ingredientDetails.get_data);
	const orderDetailsVisible = useSelector(selectors.orderDetails.get_visible);

	useEffect(() => {
		dispatch(fetchAllIngedients());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleOnCloseErr() {
		dispatch(fetchAllIngedients());
	}

	function handleOnCloseIngredient() {
		dispatch(actions.ingredientDetails.set(null));
	}

	function handleOnCloseOrder() {
		dispatch(actions.orderDetails.visible(false));
	}

	function handleOnClickOrder() {
		if (orderDetailsStatus !== 'loading') {
			dispatch(fetchAddOrder(orderDetails));
		}
		dispatch(actions.orderDetails.visible(true));
	}

	if (loadingState === 'loading') {
		return <Preloader box={160} visible={true} />;
	} else if (loadingState === 'error') {
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
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor onClick={handleOnClickOrder} />
					</DndProvider>
				</main>
			</div>
			<Modal text={'Детали ингредиента'} onClose={handleOnCloseIngredient}>
				<IngredientDetailes item={selectedIngredient} />
			</Modal>
			<Modal text={' '} onClose={handleOnCloseOrder}>
				<OrderDetailes item={orderDetailsVisible} />
			</Modal>
		</div>
	);
};
