import styles from './orders-stack-card.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@services/store';

import { selectors } from '@services/selectors';
import { TOrderCard } from '@utils/types';
import imgUnknouwn from '@utils/images/unknown.png';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredientImg } from '@components/orders-stack/order-stack-imgs/order-stack-img';
import { APP_PATH, ORDER_STATUS_TXT } from '@utils/customConfig';

interface IOrderCardProps {
	item: TOrderCard;
	statusVisible: boolean;
}
interface IOrderTotalProps {
	list: string[];
}

function OrderTotal({ list }: IOrderTotalProps) {
	const allIngredients = useAppSelector(selectors.burgerIngredients.get_all);
	const len = list.length;
	const imgs: string[] = [];
	let sum = 0;
	list.forEach((element: string) => {
		const igredient = allIngredients.find((item) => item._id === element);
		// if (igredient && igredient.type === 'bun') {
		// 	sum += 2 * igredient.price;
		// 	imgs.push(igredient.image);
		// } else if (igredient) {
		// 	sum += igredient.price;
		// 	imgs.push(igredient.image);
		// } else {
		// 	imgs.push(imgUnknouwn);
		// } else
		if (igredient) {
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

export function OrderItem({ item, statusVisible }: IOrderCardProps) {
	const navigate = useNavigate();
	const location = useLocation();
	function handlerClick() {
		if (statusVisible) {
			navigate(`${APP_PATH.ordersUserStack}/${item.number}`, {
				state: { background: location },
			});
			// navigate(APP_PATH.ordersUserStack + '/' + item.number);
		} else {
			navigate(`${APP_PATH.ordersStack}/${item.number}`, {
				state: { background: location },
			});
			// navigate(APP_PATH.ordersStack + '/' + item.number);
		}
	}
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<section className={styles.card} onClick={handlerClick}>
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
					{ORDER_STATUS_TXT[item.status]}
				</div>
			)}
			<OrderTotal list={item.ingredients} />
		</section>
	);
}
