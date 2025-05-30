import { useAppSelector } from '@services/store';
import { func } from 'prop-types';
import { selectors } from '@services/selectors';

import conteiner from './burger-constructor.module.scss';
import { BurgerComponents } from './burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IBurgerConstructorProps {
	onClick: () => void;
}

export function BurgerConstructor({ onClick }: IBurgerConstructorProps) {
	const orderTotal = useAppSelector(selectors.burgerIngredients.get_total);
	const isValid =
		useAppSelector(selectors.burgerConstructor.get_data)[0] !== '';
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
					disabled={!isValid}
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
