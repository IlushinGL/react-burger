import { object, func } from 'prop-types';
import block from './burger-ingredients-item.module.scss';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredientsItem({ item, onClick }) {
	function handleOnClick() {
		onClick(item);
	}
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<section className={block.item} onClick={handleOnClick}>
			<img className={block.image} src={item.image} alt={item.name} />
			<div className={block.price}>
				{item.price}
				<CurrencyIcon type='primary' />
			</div>
			<div className={block.name}>{item.name}</div>
			<div className={block.count}>
				{item.count > 0 && <Counter count={item.count} size='default' />}
			</div>
		</section>
	);
}

BurgerIngredientsItem.propTypes = {
	item: object,
	onClick: func,
};
