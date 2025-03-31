import { useState } from 'react';
import conteiner from './burger-constructor.module.scss';
import { BurgerComponents } from './burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor({ ingredients, data, onClick }) {
	const [total, setTotal] = useState(0);
	function handlerOnTotal(val) {
		setTotal(val);
	}
	return (
		<div className={conteiner.section}>
			<section className={conteiner.components}>
				<BurgerComponents
					ingredients={ingredients}
					data={data}
					onTotal={handlerOnTotal}
				/>
			</section>
			<section className={conteiner.info}>
				<div className={conteiner.total}>
					{total}
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
			<div className={conteiner.scroll}></div>
		</div>
	);
}
