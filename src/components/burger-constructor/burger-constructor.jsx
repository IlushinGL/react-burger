import conteiner from './burger-constructor.module.scss';
import { BurgerComponents } from './burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor({ ingredients, data }) {
	return (
		<div className={conteiner.section}>
			<section className={conteiner.components}>
				<BurgerComponents ingredients={ingredients} data={data} />
			</section>
			<section className={conteiner.info}>
				<div className={conteiner.total}>
					610
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</section>
			<div className={conteiner.scroll}></div>
		</div>
	);
}
