import styles from './order-card.module.scss';
import { useAppSelector } from '@services/store';
import { selectors } from '@services/selectors';
import { useParams } from 'react-router-dom';

import { ORDER_STATUS_TXT } from '@utils/customConfig';
import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import imgUnknouwn from '@utils/images/unknown.png';
import { TOrderCard } from '@utils/types';
import { Modal } from '@components/modal/modal';

interface IOrderCompositionProps {
	item: TOrderCard;
}
type TOrderComposition = {
	img: string;
	name: string;
	price: string;
};

function OrderComposition({ item }: IOrderCompositionProps) {
	const allIngredients = useAppSelector(selectors.burgerIngredients.get_all);
	const ingredients = item.ingredients;
	const composition: TOrderComposition[] = [];
	let sum = 0;
	ingredients.forEach((element: string) => {
		const igredient = allIngredients.find((item) => item._id === element);
		// if (igredient && igredient.type === 'bun') {
		// 	sum += 2 * igredient.price;
		// 	composition.push({
		// 		img: igredient.image,
		// 		name: igredient.name,
		// 		price: '2 x ' + igredient.price,
		// 	});
		// } else
		if (igredient) {
			sum += igredient.price;
			composition.push({
				img: igredient.image,
				name: igredient.name,
				price: '1 x ' + igredient.price,
			});
		} else {
			composition.push({
				img: imgUnknouwn,
				name: '...ингредиент не найден...',
				price: '0 x 0',
			});
		}
	});
	return (
		<>
			<div className={styles.list}>
				{composition.map((row, i) => (
					<div key={i} className={styles.list_row}>
						<img className={styles.list_row_img} src={row.img} alt={row.name} />
						<div className={styles.list_row_info}>
							<div>{row.name}</div>
							<div className={styles.cost}>
								{row.price}
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.total}>
				<div className={styles.total_date}>
					<FormattedDate date={new Date(item.updatedAt)} />
				</div>
				<div className={styles.cost}>
					{sum}
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</>
	);
}

function OrderCardInfo({ item }: IOrderCompositionProps) {
	return (
		<>
			<div className={styles.name}>{item.name}</div>
			<div className={styles.status + ' ' + styles['status_' + item.status]}>
				{ORDER_STATUS_TXT[item.status]}
			</div>
			<div className={styles.title}>Состав:</div>
			<OrderComposition item={item} />
		</>
	);
}

export function OrderCardPage() {
	const isModal = false;
	const { number } = useParams();
	const ordersStream = useAppSelector(selectors.liveOrders.get_orders);
	if (!ordersStream) {
		return null;
	}
	const item = ordersStream.orders.find(
		(order) => order.number === Number(number)
	);
	if (item && isModal) {
		return (
			<Modal
				text={'#0' + item.number}
				style='digits'
				onClose={() => {
					return;
				}}>
				<OrderCardInfo item={item} />
			</Modal>
		);
	} else if (item) {
		return (
			<main className={styles.content}>
				<div className={styles.number}>#0{item.number}</div>
				<OrderCardInfo item={item} />
			</main>
		);
	}
	return null;
}
