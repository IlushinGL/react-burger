import { useAppSelector } from '@services/store';
import conteiner from './order-details.module.scss';
import Preloader from '@components/preloader/preloader';
import { selectors } from '@services/selectors';

export function OrderDetailes() {
	const name = useAppSelector(selectors.orderDetails.get_name);
	const number = useAppSelector(selectors.orderDetails.get_number);
	const status = useAppSelector(selectors.orderDetails.get_status);
	const error = useAppSelector(selectors.orderDetails.get_error);

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
				<div className={conteiner.status}>Ваш заказ готов</div>
				<div className={conteiner.comment}>
					Время ожидания доставки сейчас ~10 минут ♥️
				</div>
			</section>
		);
	}
}
