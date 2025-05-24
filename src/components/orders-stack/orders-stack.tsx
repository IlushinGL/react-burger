import styles from './orders-stack.module.scss';
import { OrderItem } from './orders-stack-card/orders-stack-card';
import { TOrderCard } from '@utils/types';

const orderA: TOrderCard = {
	_id: 'num1A',
	number: 2379,
	name: 'Устрично-крабовый-Кисло-сладко-кардамонно-куропачий-Зайце-поросятино-телячий Бургер.',
	status: 'done',
	createdAt: '2024-10-10T17:33:32.877Z',
	updatedAt: '2024-10-10T17:35:32.877Z',
	ingredients: [
		'643d69a5c3f7b9001cfa093c',
		'643d69a5c3f7b9001cfa0945',
		'643d69a5c3f7b9001cfa094a',
		'643d69a5c3f7b9001cfa0948',
		'643d69a5c3f7b9001cfa0946',
		'643d69a5c3f7b9001cfa0942',
		'643d69a5c3f7b9001cfa0949',
		'643d69a5c3f7b9001cfa0945',
	],
};
const orderB: TOrderCard = {
	_id: 'num1B',
	number: 2381,
	name: 'Зайце-поросятино-телячий Бургер.',
	status: 'created',
	createdAt: '2024-12-10T17:33:32.877Z',
	updatedAt: '2024-12-10T17:33:32.877Z',
	ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093f'],
};
const orderC: TOrderCard = {
	_id: 'num1C',
	number: 2379,
	name: 'Сладко-кардамонно-куропачий-Зайце Бургер.',
	status: 'done',
	createdAt: '2024-10-10T17:33:32.877Z',
	updatedAt: '2025-03-10T10:00:32.877Z',
	ingredients: [
		'643d69a5c3f7b9001cfa093c',
		'643d69a5c3f7b9001cfa0945',
		'643d69a5c3f7b9001cfa0946',
		'643d69a5c3f7b9001cfa0942',
		'643d69a5c3f7b9001cfa0949',
		'643d69a5c3f7b9001cfa0945',
	],
};

export function OrdersStack() {
	return (
		<div className={styles.content}>
			<OrderItem item={orderA} />
			<OrderItem item={orderB} />
			<OrderItem item={orderC} />
			<div className={styles.item}>4</div>
			<div className={styles.item}>5</div>
		</div>
	);
}
