import styles from './orders-stack.module.scss';
import { OrderItem } from './orders-stack-card/orders-stack-card';
import { useAppSelector } from '@services/store';
import { selectors } from '@services/selectors';
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
	const ordersStream = useAppSelector(selectors.liveMyOrders.get_orders);
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
