import conteiner from './order-details.module.scss';
import Preloader from '@components/preloader/preloader';

export function OrderDetailes({ order }) {
	if (!order) {
		return null;
	}
	return (
		<section>
			<div className={conteiner.number}>{order._id}</div>
			<div className={conteiner.title}>идентификатор заказа</div>
			<div className={conteiner.image}>
				<Preloader box='120' visible={true} />
			</div>
			<div className={conteiner.status}>Ваш заказ начали готовить</div>
			<div className={conteiner.comment}>
				Дождитесь готовности на орбитальной станции
			</div>
		</section>
	);
}
