import { useSelector } from 'react-redux';
import { selectors } from '@services/selectors';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';
import conteiner from './burger-components.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientLink } from '@utils/types';

interface IBurgerDraggableComponentProps {
	item: TIngredientLink;
	onDelete: (item: TIngredientLink) => void;
	onDrop: (item: { resiver: string; source: string }) => void;
}

export function BurgerDraggableComponent({
	item,
	onDelete,
	onDrop,
}: IBurgerDraggableComponentProps) {
	const itemData = useSelector((state) =>
		selectors.burgerConstructor.get_byId(state, item.id)
	);
	const [{ isDrag }, dragItemRef, dragPreviewItemRef] = useDrag({
		type: 'filling',
		item: { id: item.key },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});
	const [{ isHoverMe }, dropItemRef] = useDrop({
		accept: 'filling',
		drop(item) {
			handlerOnDrop(item as TIngredientLink);
		},
		collect: (monitor) => ({
			isHoverMe: monitor.isOver(),
		}),
	});

	const meBorderColor = isHoverMe ? 'accept' : 'transparent';

	function handlerOnDel() {
		onDelete(item);
	}

	function handlerOnDrop(data: TIngredientLink) {
		onDrop({ resiver: item.key, source: data.id });
	}

	return (
		<div ref={dropItemRef}>
			{isDrag ? null : (
				<DragPreviewImage
					connect={dragPreviewItemRef}
					src={itemData.image_mobile}
				/>
			)}
			<div
				className={conteiner.ingredient + ' ' + conteiner[meBorderColor]}
				ref={dragItemRef}>
				<DragIcon type='primary' />
				<ConstructorElement
					text={itemData.name}
					price={itemData.price}
					thumbnail={itemData.image}
					handleClose={handlerOnDel}
					extraClass={conteiner[meBorderColor]}
				/>
			</div>
		</div>
	);
}
