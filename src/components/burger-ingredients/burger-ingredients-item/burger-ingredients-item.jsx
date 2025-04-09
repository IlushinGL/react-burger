import { object, func } from 'prop-types';
import block from './burger-ingredients-item.module.scss';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredientsItem({ item, onClick }) {
	const [, dragRef, dragPreviewRef] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'filling',
		item: { id: item._id },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	function handleOnClick() {
		onClick(item);
	}

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<section className={block.item} onClick={handleOnClick} ref={dragRef}>
			<div className={block.image}>
				<img
					className={block.image_peview}
					src={item.image}
					alt={item.name}
					ref={dragPreviewRef}
				/>
			</div>
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
