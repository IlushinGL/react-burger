import styles from './orders-stack.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredientImg } from './order-stack-imgs/order-stack-img';
// import tstimg from '../../utils/blank_user.jpg';
// const tstImages: string[] = [
// 	tstimg,
// 	tstimg,
// 	tstimg,
// 	tstimg,
// 	tstimg,
// 	tstimg,
// 	tstimg,
// ];

export function OrdersStack() {
	return (
		<div className={styles.content}>
			<section className={styles.item}>
				<div className={styles.item_id}>
					<div className={styles.item_id_num}>#12345</div>
					<div className={styles.item_id_date}>
						<FormattedDate date={new Date('2024-10-10T17:33:32.877Z')} />
					</div>
				</div>
				<div className={styles.item_name}>
					Устрично-камбально-крабья-Кисло-сладко-кардамонно-Масло-яблоко-медово-
					Сельдерейно-огуречно-Голубино-глухарино-куропачья-
					Зайце-поросятино-телячья Кулебяка.
				</div>
				<div className={styles.item_status}>Создан</div>
				<div className={styles.item_summary}>
					<div className={styles.item_summary_images}>
						<OrderIngredientImg len={9} column={0} />
						<OrderIngredientImg len={9} column={1} />
						<OrderIngredientImg len={9} column={2} />
						<OrderIngredientImg len={9} column={3} />
						<OrderIngredientImg len={9} column={4} />
						<OrderIngredientImg len={9} column={5} />
						<OrderIngredientImg len={9} column={6} />
						<OrderIngredientImg len={9} column={7} />
						<OrderIngredientImg len={9} column={8} />
					</div>
					<div className={styles.item_summary_cost}>
						4230
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</section>
			<section className={styles.item}>
				<div className={styles.item_id}>
					<div className={styles.item_id_num}>#12346</div>
					<div className={styles.item_id_date}>
						<FormattedDate date={new Date('2024-12-10T17:33:32.877Z')} />
					</div>
				</div>
				<div className={styles.item_name}>
					Зайце-поросятино-телячья Кулебяка.
				</div>
				<div className={styles.item_status + ' ' + styles.item_status_done}>
					Выполнен
				</div>
				<div className={styles.item_summary}>
					<div className={styles.item_summary_images}>
						<OrderIngredientImg len={9} column={0} />
						<OrderIngredientImg len={9} column={1} />
						<OrderIngredientImg len={9} column={2} />
						<OrderIngredientImg len={9} column={3} />
					</div>
					<div className={styles.item_summary_cost}>
						1340
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</section>
			<div className={styles.item}>3</div>
			<div className={styles.item}>4</div>
			<div className={styles.item}>5</div>
		</div>
	);
}
