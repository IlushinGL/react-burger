import { object } from 'prop-types';
import conteiner from './order-details.module.scss';
import Preloader from '@components/preloader/preloader';

export function OrderDetailes({ item }) {
	if (!item) {
		return null;
	}
	return (
		<section>
			<div className={conteiner.number}>{item._id}</div>
			<div className={conteiner.title}>идентификатор заказа</div>
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
