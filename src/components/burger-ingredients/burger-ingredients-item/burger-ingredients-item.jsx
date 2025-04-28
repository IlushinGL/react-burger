import { object } from 'prop-types';
import block from './burger-ingredients-item.module.scss';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { actions } from '@services/actions';
import { useDispatch } from 'react-redux';
import { APP_PATH } from '@utils/customConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredientsItem({ item }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [{ isDrag }, dragRef, dragPreviewRef] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'filling',
		item: { id: item._id },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	function handleOnClick() {
		dispatch(actions.ingredientDetails.set(item));
		navigate(`${APP_PATH.ingredientsPath}/${item._id}`, {
			state: { background: location },
		});
	}

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<section key={item._id} className={block.item} onClick={handleOnClick}>
			{isDrag ? null : (
				<DragPreviewImage connect={dragPreviewRef} src={item.image} />
			)}
			<div className={block.image}>
				<img
					className={block.image_peview}
					src={item.image}
					alt={item.name}
					ref={dragRef}
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
};
