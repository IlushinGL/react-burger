import { useState, useEffect } from 'react';
import main from './app.module.scss';

import { BURGER_DATA } from '@utils/burger-data';

import Preloader from '@components/preloader/preloader';
import { getIngredients } from '../../api/get-ingredients';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

export const App = () => {
	const [ingredientsState, setIngredientsState] = useState({
		data: null,
		loading: true,
	});
	const [modalErrVisible, setModalErrVisible] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		getIngredients(handleIgredientsLoading);
	}, []);

	function handleIgredientsLoading({ ingredients, loading }) {
		if (ingredients instanceof Error) {
			// console.log(loading, ingredients);
			setModalErrVisible(true);
			setIngredientsState({ data: ingredients, loading: false });
		} else if (!loading && ingredients) {
			const newData = ingredients.map((item) => {
				return { ...item, count: 1 };
			});
			// console.log(loading, newData);
			setModalErrVisible(false);
			setIngredientsState({ data: newData, loading: false });
		} else {
			// console.log(loading, newData);
			setIngredientsState({ data: ingredients, loading: loading });
		}
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
		setSelectedOrder(BURGER_DATA);
	}

	if (ingredientsState.loading) {
		return <Preloader box={160} visible={ingredientsState.loading} />;
	}

	if (modalErrVisible) {
		return (
			<Modal text={'Ошибка при запросе данных'} onClose={handleOnCloseErr}>
				<ErrDetailes item={ingredientsState.data.message} />
			</Modal>
		);
	}

	return (
		<div className={main.main}>
			<div className={main.conteiner}>
				<AppHeader />
				<main className={main.data}>
					<BurgerIngredients
						data={ingredientsState.data}
						onClick={handleOnClickIngredient}
					/>
					<BurgerConstructor
						ingredients={ingredientsState.data}
						data={BURGER_DATA}
						onClick={handleOnClickOrder}
					/>
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
