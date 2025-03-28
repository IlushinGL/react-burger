import block from './burger-ingredients-item.module.scss';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredientsItem({ item }) {
	return (
		<section className={block.item}>
			<img className={block.image} src={item.image} alt={item.name} />
			<div className={block.price}>
				{item.price}
				<CurrencyIcon type='primary' />
			</div>
			<div className={block.name}>{item.name}</div>
			<div className={block.count}>
				<Counter count={item.count} size='default' />
			</div>
		</section>
	);
}
