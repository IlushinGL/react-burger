import { useSelector } from 'react-redux';
import conteiner from './order-details.module.scss';
import Preloader from '@components/preloader/preloader';
import { selectors } from '@services/selectors';

export function OrderDetailes() {
	const name = useSelector(selectors.orderDetails.get_name);
	const number = useSelector(selectors.orderDetails.get_number);
	const status = useSelector(selectors.orderDetails.get_status);
	const error = useSelector(selectors.orderDetails.get_error);

	if (status === 'loading') {
		return (
			<section>
				<div className={conteiner.number}>{number}</div>
				<div className={conteiner.title}>{name}</div>
				<div className={conteiner.image}>
					<Preloader box={120} visible={true} />
				</div>
				<div className={conteiner.status}>заказ обрабатывается...</div>
				<div className={conteiner.comment}>Подождите несколько секунд.</div>
			</section>
		);
	}

	if (status === 'error') {
		return (
			<section>
				<div className={conteiner.number}>{number}</div>
				<div className={conteiner.title}>{name}</div>
				<div className={conteiner.image}>{'Error'}</div>
				<div className={conteiner.status}>возникли проблемы...</div>
				<div className={conteiner.comment}>{error}</div>
			</section>
		);
	}

	if (status === 'idle') {
		return (
			<section>
				<div className={conteiner.number}>{number}</div>
				<div className={conteiner.title}>{name}</div>
				<div className={conteiner.image}>
					<Preloader box={120} visible={true} />
				</div>
				<div className={conteiner.status}>
					Ваш заказ принят и мы начали его готовить
				</div>
				<div className={conteiner.comment}>
					Сейчас время ожидания не более 10 минут ♥️
				</div>
			</section>
		);
	}
}
