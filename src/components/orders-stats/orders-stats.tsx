import styles from './orders-stat.module.scss';
import { selectors } from '@services/selectors';
import { useAppSelector } from '@services/store';
import { TOrderCard, TOrders } from '@utils/types';

function listDone(stream: TOrders, isDone: boolean): string[] {
	let filter: TOrderCard[];
	if (isDone) {
		filter = stream.orders.filter((order) => order.status === 'done');
	} else {
		filter = stream.orders.filter((order) => order.status !== 'done');
	}
	const res: string[] = filter.map((order) => order.number + '').slice(0, 10);
	// if (filter.length > 10) {
	// 	res[9] = res[9] + '...';
	// }
	return res;
}

export function OrdersStatistic() {
	const ordersStream = useAppSelector(selectors.liveOrders.get_orders);
	if (!ordersStream) {
		return null;
	}
	return (
		<section className={styles.content}>
			<div className={styles.lists_data}>
				<div className={styles.item}>
					<div className={styles.header}>Готовы:</div>
					<div className={styles.list}>
						{listDone(ordersStream, true).map((num, i) => (
							<div key={i} className={styles.list_done}>
								0{num}
							</div>
						))}
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.header}>В работе:</div>
					<div className={styles.list}>
						{listDone(ordersStream, false).map((num, i) => (
							<div key={i}>0{num}</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.header}>Выполнено за все время:</div>
				<div className={styles.item_data}>{ordersStream.total}</div>
			</div>
			<div className={styles.item}>
				<div className={styles.header}>Выполнено за сегодня:</div>
				<div className={styles.item_data}>{ordersStream.totalToday}</div>
			</div>
		</section>
	);
}
