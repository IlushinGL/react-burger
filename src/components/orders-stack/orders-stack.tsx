import styles from './orders-stack.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrdersStack() {
	return (
		<div className={styles.content}>
			<section className={styles.item}>
				<div className={styles.item_id}>
					<div className={styles.item_id_num}>#12345</div>
					<div className={styles.item_id_date}>вчера 11:00</div>
				</div>
				<div className={styles.item_name}>
					Устрично-камбально-крабья-Кисло-сладко-кардамонно-Масло-яблоко-медово-
					Сельдерейно-огуречно-Голубино-глухарино-куропачья-
					Зайце-поросятино-телячья Кулебяка.
				</div>
				<div className={styles.item_status}>Создан</div>
				<div className={styles.item_summary}>
					<div className={styles.item_summary_images}>
						<div>image1</div>
						<div>image2</div>
						<div>image3</div>
						<div>image4</div>
					</div>
					<div className={styles.item_summary_cost}>
						123
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</section>
			<div className={styles.item}>2</div>
			<div className={styles.item}>3</div>
			<div className={styles.item}>4</div>
			<div className={styles.item}>5</div>
		</div>
	);
}
