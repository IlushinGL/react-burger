import styles from './orders-stack.module.scss';
import { OrderItem } from './orders-stack-card/orders-stack-card';
import { TST_STREAM } from '@utils/tst-data';
interface IOrdersStackProps {
	statusVisible: boolean;
}

export function OrdersStack({ statusVisible }: IOrdersStackProps) {
	return (
		<div className={styles.content}>
			{TST_STREAM.orders.map((order) => (
				<OrderItem key={order._id} item={order} statusVisible={statusVisible} />
			))}
		</div>
	);
}
