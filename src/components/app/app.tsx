import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';

import { useEffect } from 'react';

import viewPort from './app.module.scss';

import Preloader from '@components/preloader/preloader';

import {
	fetchAllIngedients,
	fetchAddOrder,
	checkUserAuth,
} from '@services/actionsThunk';

import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { OnlyAuth, OnlyUnAuth } from '@components/protectedRout';

import { AppHeader } from '@components/app-header/app-header';

import { Home } from '@components/app/pages/home/home';
import { Profile } from './pages/profile/profile';
import { NotFound } from '@components/app/pages/404/404';
import { Modal } from '@components/modal/modal';
import { ErrDetailes } from '@components/err-details/err-details';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';

import { Login } from './pages/auth/pageLogin';
import { Register } from './pages/auth/pageRegister';
import { ForgotPassword } from '@components/app/pages/auth/pageForgotPassword';
import { ResetPassword } from './pages/auth/pageResetPassword';

export const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;
	const loadingState = useSelector(selectors.burgerIngredients.get_status);
	const errorState = useSelector(selectors.burgerIngredients.get_error);
	const orderDetails = useSelector(selectors.burgerConstructor.get_data);
	const orderDetailsStatus = useSelector(selectors.orderDetails.get_status);
	const orderDetailsVisible = useSelector(selectors.orderDetails.get_visible);
	const user = useSelector(selectors.currentUser.get_user);

	useEffect(() => {
		// @ts-expect-error "sprint4"
		dispatch(fetchAllIngedients());
		// @ts-expect-error "sprint4"
		dispatch(checkUserAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleOnCloseErr() {
		// @ts-expect-error "sprint4"
		dispatch(fetchAllIngedients());
	}

	function handleOnCloseIngredient() {
		dispatch(actions.ingredientDetails.set(null));
		navigate(-1);
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
				// @ts-expect-error "sprint4"
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
				<>
					<AppHeader />

					<Routes location={background || location}>
						<Route
							path={APP_PATH.home}
							element={<Home onSubmit={handleOnClickOrder} />}
						/>
						<Route
							path={APP_PATH.ingredientPattern}
							element={<IngredientDetailes />}
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
						<Route path='*' element={<NotFound />} />
					</Routes>

					{background && (
						<Routes>
							<Route
								path={APP_PATH.ingredientPattern}
								element={
									<Modal
										text={'Детали ингредиента'}
										onClose={handleOnCloseIngredient}>
										<IngredientDetailes />
									</Modal>
								}
							/>
						</Routes>
					)}
				</>
			</div>
			{orderDetailsVisible && (
				<Modal text={' '} onClose={handleOnCloseOrder}>
					<OrderDetailes />
				</Modal>
			)}
		</div>
	);
};
