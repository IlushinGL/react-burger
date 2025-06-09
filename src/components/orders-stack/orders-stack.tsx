import { useEffect } from 'react';
import styles from './orders-stack.module.scss';
import { OrderItem } from './orders-stack-card/orders-stack-card';
import { useAppDispatch, useAppSelector } from '@services/store';
import { selectors } from '@services/selectors';
import { LIVE_MY_ORDERS_URL } from '@utils/customConfig';

import {
	connectMy,
	disconnectMy,
} from '@services/liveMyOrders/liveMyOrdersActions';

interface IOrdersStackProps {
	statusVisible: boolean;
}

export function OrdersStack({ statusVisible }: IOrdersStackProps) {
	const ordersStream = useAppSelector(selectors.liveOrders.get_orders);
	if (ordersStream) {
		return (
			<div className={styles.content}>
				{ordersStream.orders.map((order) => (
					<OrderItem
						key={order._id}
						item={order}
						statusVisible={statusVisible}
					/>
				))}
			</div>
		);
	}
}

export function MyOrdersStack({ statusVisible }: IOrdersStackProps) {
	const dispatch = useAppDispatch();
	const ordersStream = useAppSelector(selectors.liveMyOrders.get_orders);

	useEffect(() => {
		dispatch(connectMy(LIVE_MY_ORDERS_URL));
		return () => {
			dispatch(disconnectMy());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!!!ordersStream) {
		return (
			<div className={styles.content}>
				<div className={styles.preload}>соединение...</div>
			</div>
		);
	}

	return (
		<div className={styles.content}>
			{ordersStream.orders.toReversed().map((order) => (
				<OrderItem key={order._id} item={order} statusVisible={statusVisible} />
			))}
		</div>
	);
}
