import { useSelector } from 'react-redux';
import { selectors } from '@services/selectors';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';
import conteiner from './burger-components.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TItem = {
	key: string;
	id: string;
};

interface IBurgerDraggableComponentProps {
	item: TItem;
	onDelete: (item: TItem) => void;
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
			handlerOnDrop(item);
		},
		collect: (monitor) => ({
			isHoverMe: monitor.isOver(),
		}),
	});

	const meBorderColor = isHoverMe ? 'accept' : 'transparent';

	function handlerOnDel() {
		onDelete(item);
	}

	function handlerOnDrop(data: any) {
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
