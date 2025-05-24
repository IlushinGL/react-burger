import styles from './orders-stack-card.module.scss';
import { selectors } from '@services/selectors';
import { TOrderCard } from '@utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredientImg } from '../order-stack-imgs/order-stack-img';
import imgUnknouwn from '../../../utils/unknown.png';
import { useSelector } from 'react-redux';

interface IOrderCardProps {
	item: TOrderCard;
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

export function OrderCard({ item }: IOrderCardProps) {
	console.log(item);
}

export function OrderItem({ item }: IOrderCardProps) {
	return (
		<section className={styles.card}>
			<div className={styles.card_id}>
				<div className={styles.card_id_num}>#{item.number}</div>
				<div className={styles.card_id_date}>
					<FormattedDate date={new Date(item.updatedAt)} />
				</div>
			</div>
			<div className={styles.card_name}>{item.name}</div>
			<div className={styles.card_status}>{item.status}</div>
			<OrderTotal list={item.ingredients} />
		</section>
	);
}
