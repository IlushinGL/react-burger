import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';

import { useEffect } from 'react';

import viewPort from './app.module.scss';

import Preloader from '@components/preloader/preloader';

import { fetchAllIngedients } from '@services/burgerIngredients/burgerIngredientsSlice';
import { fetchAddOrder } from '@services/orderDetails/orderDetailsSlice';

import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { AppHeader } from '@components/app-header/app-header';

import { Home } from './pages/home/home';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

import { Login } from './pages/pageLogin';
import { Register } from './pages/pageRegister';
import { ForgotPassword } from './pages/pageForgotPassword';
import { ResetPassword } from './pages/pageResetPassword';

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
		if (orderDetailsStatus === 'idle') {
			dispatch(actions.burgerConstructor.reset());
			dispatch(actions.burgerIngredients.reset());
			dispatch(actions.orderDetails.reset());
		}
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
		<div className={viewPort.win}>
			<div className={viewPort.app}>
				<AppHeader />
				<Routes>
					<Route
						path={APP_PATH.home}
						element={<Home onSubmit={handleOnClickOrder} />}
					/>
					<Route path={APP_PATH.login} element={<Login />} />
					<Route path={APP_PATH.register} element={<Register />} />
					<Route path={APP_PATH.forgotPswd} element={<ForgotPassword />} />
					<Route path={APP_PATH.resetPswd} element={<ResetPassword />} />
					<Route path={APP_PATH.profile} element={<Login />} />
					<Route path={APP_PATH.ingredients} element={<Login />} />
				</Routes>
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
