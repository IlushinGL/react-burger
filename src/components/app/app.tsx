import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {
	APP_PATH,
	LIVE_ORDERS_URL,
	LIVE_MY_ORDERS_URL,
} from '@utils/customConfig';
import { WebSocketStatus } from '@utils/type-orders-stack';

import { useEffect } from 'react';

import styles from './app.module.scss';

import Preloader from '@components/preloader/preloader';

import {
	fetchAllIngedients,
	fetchAddOrder,
	checkUserAuth,
} from '@services/actionsThunk';
import { connect, disconnect } from '@services/liveOrders/liveOrdersActions';
import {
	connectMy,
	disconnectMy,
} from '@services/liveMyOrders/liveMyOrdersActions';

import { actions } from '@services/actions';
import { selectors } from '@services/selectors';
import { useAppDispatch, useAppSelector } from '@services/store';

import { OnlyAuth, OnlyUnAuth } from '@components/protectedRout';

import { AppHeader } from '@components/app-header/app-header';
import { Modal } from '@components/modal/modal';
import { IngredientDetailes } from '@components/ingredient-details/ingredient-details';
import { OrderDetailes } from '@components/order-details/order-details';
import { ErrDetailes } from '@components/err-details/err-details';

import { Home } from '@components/app/pages/home/home';
import { OrdersPage } from '@components/app/pages/orders/orders';
import { Profile } from '@components/app/pages/profile/profile';
import { NotFound } from '@components/app/pages/404/404';
import { Login } from '@components/app/pages/auth/pageLogin';
import { Register } from '@components/app/pages/auth/pageRegister';
import { ForgotPassword } from '@components/app/pages/auth/pageForgotPassword';
import { ResetPassword } from '@components/app/pages/auth/pageResetPassword';
import { OrderCardPage } from '@components/app/pages/order-card/orders-card';

export const App = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;

	const wsOrdersIsOnline =
		useAppSelector(selectors.liveOrders.get_status) === WebSocketStatus.ONLINE;
	const wsConnect = () => dispatch(connect(LIVE_ORDERS_URL));
	const wsDisconnect = () => dispatch(disconnect());

	const wsMyOrdersIsOnline =
		useAppSelector(selectors.liveMyOrders.get_status) ===
		WebSocketStatus.ONLINE;
	const wsMyConnect = () => dispatch(connectMy(LIVE_MY_ORDERS_URL));
	const wsMyDisconnect = () => dispatch(disconnectMy());

	const loadingState = useAppSelector(selectors.burgerIngredients.get_status);
	const errorState = useAppSelector(selectors.burgerIngredients.get_error);
	const orderDetails = useAppSelector(selectors.burgerConstructor.get_data);
	const orderDetailsStatus = useAppSelector(selectors.orderDetails.get_status);
	const orderDetailsVisible = useAppSelector(
		selectors.orderDetails.get_visible
	);
	const user = useAppSelector(selectors.currentUser.get_user);

	useEffect(() => {
		dispatch(fetchAllIngedients());
		dispatch(checkUserAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		wsConnect();
		wsMyConnect();
		return () => {
			if (wsOrdersIsOnline) {
				wsDisconnect();
			}
			if (wsMyOrdersIsOnline) {
				wsMyDisconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleOnCloseErr() {
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
		<div className={styles.win}>
			<div className={styles.app}>
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
						<Route path={APP_PATH.ordersStack} element={<OrdersPage />} />
						<Route
							path={APP_PATH.ordersStackPattern}
							element={<OrderCardPage />}
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
						<Route
							path={APP_PATH.ordersUserStack}
							element={<OnlyAuth component={<OrdersPage />} />}
						/>
						<Route
							path={APP_PATH.ordersUserStackPattern}
							element={<OnlyAuth component={<OrderCardPage />} />}
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
							<Route
								path={APP_PATH.ordersStackPattern}
								element={<OrderCardPage isModal={true} />}
							/>
							<Route
								path={APP_PATH.ordersUserStackPattern}
								element={
									<OnlyAuth component={<OrderCardPage isModal={true} />} />
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
