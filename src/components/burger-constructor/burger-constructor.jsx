import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import { selectors } from '@services/selectors';

import conteiner from './burger-constructor.module.scss';
import { BurgerComponents } from './burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor({ onClick }) {
	const orderTotal = useSelector(selectors.burgerConstructor.total);
	return (
		<div className={conteiner.section}>
			<section className={conteiner.components}>
				<BurgerComponents />
			</section>
			<section className={conteiner.info}>
				<div className={conteiner.total}>
					{orderTotal}
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={onClick}>
					Оформить заказ
				</Button>
			</section>
		</div>
	);
}

BurgerConstructor.propTypes = {
	onClick: func,
};
