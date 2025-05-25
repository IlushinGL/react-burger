import styles from './orders-stat.module.scss';
import { TST_STREAM } from '@utils/tst-data';
import { TOrderCard } from '@utils/types';

function listDone(isDone: boolean) {
	let filter: TOrderCard[];
	if (isDone) {
		filter = TST_STREAM.orders.filter((order) => order.status === 'done');
	} else {
		filter = TST_STREAM.orders.filter((order) => order.status !== 'done');
	}
	return filter.map((order) => order.number);
}

export function OrdersStatistic() {
	return (
		<section className={styles.content}>
			<div className={styles.lists_data}>
				<div className={styles.item}>
					<div className={styles.header}>Готовы:</div>
					<div className={styles.list}>
						{listDone(true).map((num, i) => (
							<div key={i} className={styles.list_done}>
								0{num}
							</div>
						))}
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.header}>В работе:</div>
					<div className={styles.list}>
						{listDone(false).map((num, i) => (
							<div key={i}>0{num}</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.header}>Выполнено за все время:</div>
				<div className={styles.item_data}>{TST_STREAM.total}</div>
			</div>
			<div className={styles.item}>
				<div className={styles.header}>Выполнено за сегодня:</div>
				<div className={styles.item_data}>{TST_STREAM.totalToday}</div>
			</div>
		</section>
	);
}
