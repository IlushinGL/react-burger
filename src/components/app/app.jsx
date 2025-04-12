import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import main from './app.module.scss';

// import { BURGER_DATA } from '@utils/burger-data';

import Preloader from '@components/preloader/preloader';

import { fetchAllIngedients } from '@services/burgerIngredients/burgerIngredientsSlice';

// import { actions } from '@services/actions';
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
	const burgerConstructorData = useSelector(
		selectors.burgerConstructor.get_data
	);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		// if (loadingState === 'idle') {
		// }
		dispatch(fetchAllIngedients());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleOnCloseErr() {
		dispatch(fetchAllIngedients());
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
						<BurgerIngredients onClick={handleOnClickIngredient} />
						<BurgerConstructor onClick={handleOnClickOrder} />
					</DndProvider>
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
