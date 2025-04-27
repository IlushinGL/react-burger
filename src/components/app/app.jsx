import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';

import { useEffect } from 'react';

import viewPort from './app.module.scss';

import Preloader from '@components/preloader/preloader';

import {
	fetchAllIngedients,
	fetchAddOrder,
	checkUserAuth,
} from '@services/actionsThunk';
// import { fetchUserGet } from '@services/user/userSlice';

import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { OnlyAuth, OnlyUnAuth } from '@components/protectedRout';

import { AppHeader } from '@components/app-header/app-header';

import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { NotFound } from './pages/404/404';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

import { Login } from './pages/auth/pageLogin';
import { Register } from './pages/auth/pageRegister';
import { ForgotPassword } from './pages/auth/pageForgotPassword';
import { ResetPassword } from './pages/auth/pageResetPassword';

export const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loadingState = useSelector(selectors.burgerIngredients.get_status);
	const errorState = useSelector(selectors.burgerIngredients.get_error);
	const orderDetails = useSelector(selectors.burgerConstructor.get_data);
	const orderDetailsStatus = useSelector(selectors.orderDetails.get_status);
	const selectedIngredient = useSelector(selectors.ingredientDetails.get_data);
	const orderDetailsVisible = useSelector(selectors.orderDetails.get_visible);
	const user = useSelector(selectors.currentUser.get_user);

	useEffect(() => {
		dispatch(fetchAllIngedients());
		dispatch(checkUserAuth());
		// dispatch(fetchUserGet());
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
		if (user) {
			if (orderDetailsStatus !== 'loading') {
				dispatch(fetchAddOrder(orderDetails));
			}
			dispatch(actions.orderDetails.visible(true));
		} else {
			navigate(APP_PATH.login);
		}
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
					<Route
						path={APP_PATH.login}
						element={<OnlyUnAuth component={<Login />} />}
					/>
					<Route
						path={APP_PATH.register}
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path={APP_PATH.forgotPswd}
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path={APP_PATH.resetPswd}
						element={<OnlyUnAuth component={<ResetPassword />} />}
					/>
					<Route
						path={APP_PATH.profile}
						element={<OnlyAuth component={<Profile />} />}
					/>
					<Route path={APP_PATH.ingredients} element={<Login />} />
					<Route path='*' element={<NotFound />} />
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
