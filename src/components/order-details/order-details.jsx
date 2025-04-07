import { object } from 'prop-types';
import conteiner from './order-details.module.scss';
import Preloader from '@components/preloader/preloader';

export function OrderDetailes({ item }) {
	if (!item) {
		return null;
	}
	if (!item.success) {
		return (
			<section>
				<div className={conteiner.image}>
					<Preloader box={120} visible={true} />
				</div>
				<div className={conteiner.status}>Пока не можем принять заказ 😓</div>
				<div className={conteiner.comment}>
					Уже начали разбираться. Попробуйте чуть позже.
				</div>
			</section>
		);
	}
	return (
		<section>
			<div className={conteiner.number}>{item.order.number}</div>
			<div className={conteiner.title}>{item.name}</div>
			<div className={conteiner.image}>
				<Preloader box={120} visible={true} />
			</div>
			<div className={conteiner.status}>Ваш заказ начали готовить</div>
			<div className={conteiner.comment}>
				Дождитесь готовности на орбитальной станции
			</div>
		</section>
	);
}

OrderDetailes.propTypes = {
	item: object,
};
