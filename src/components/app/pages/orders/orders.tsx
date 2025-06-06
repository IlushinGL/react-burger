import styles from './orders.module.scss';
import { OrdersStack } from '@components/orders-stack/orders-stack';
import { OrdersStatistic } from '@components/orders-stats/orders-stats';
import { connect, disconnect } from '@services/liveOrders/liveOrdersActions';
import { useAppDispatch } from '@services/store';
import { LIVE_ORDERS_URL } from '@utils/customConfig';
import { useEffect } from 'react';

export function OrdersPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(connect(LIVE_ORDERS_URL));
		return () => {
			dispatch(disconnect());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main className={styles.content}>
			<div className={styles.title}>Лента заказов</div>
			<div className={styles.data}>
				<OrdersStack statusVisible={false} />
				<OrdersStatistic />
			</div>
		</main>
	);
}
