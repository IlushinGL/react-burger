import styles from './orders-stack-card.module.scss';
import { useSelector } from 'react-redux';

import { selectors } from '@services/selectors';
import { TOrderCard } from '@utils/types';
import imgUnknouwn from '@utils/images/unknown.png';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredientImg } from '@components/orders-stack/order-stack-imgs/order-stack-img';

const statusText: { [key: string]: string } = {
	pending: 'Готовится',
	done: 'Выполнен',
	created: 'Создан',
};
interface IOrderCardProps {
	item: TOrderCard;
	statusVisible: boolean;
}
interface IOrderTotalProps {
	list: string[];
}

function OrderTotal({ list }: IOrderTotalProps) {
	const allIngredients = useSelector(selectors.burgerIngredients.get_all);
	const len = list.length;
	const imgs: string[] = [];
	let sum = 0;
	list.forEach((element: string) => {
		const igredient = allIngredients.find((item) => item._id === element);
		if (igredient && igredient.type === 'bun') {
			sum += 2 * igredient.price;
			imgs.push(igredient.image);
		} else if (igredient) {
			sum += igredient.price;
			imgs.push(igredient.image);
		} else {
			imgs.push(imgUnknouwn);
		}
	});
	return (
		<div className={styles.card_summary}>
			<div className={styles.card_summary_images}>
				{list.map((item, i) => (
					<OrderIngredientImg key={i} len={len} column={i} img={imgs[i]} />
				))}
			</div>
			<div className={styles.card_summary_cost}>
				{sum}
				<CurrencyIcon type='primary' />
			</div>
		</div>
	);
}

export function OrderCard({ item, statusVisible }: IOrderCardProps) {
	console.log(item, statusVisible);
}

export function OrderItem({ item, statusVisible }: IOrderCardProps) {
	return (
		<section className={styles.card}>
			<div className={styles.card_id}>
				<div className={styles.card_id_num}>#0{item.number}</div>
				<div className={styles.card_id_date}>
					<FormattedDate date={new Date(item.updatedAt)} />
				</div>
			</div>
			<div className={styles.card_name}>{item.name}</div>
			{statusVisible && (
				<div
					className={
						styles.card_status + ' ' + styles['card_status_' + item.status]
					}>
					{statusText[item.status]}
				</div>
			)}
			<OrderTotal list={item.ingredients} />
		</section>
	);
}
