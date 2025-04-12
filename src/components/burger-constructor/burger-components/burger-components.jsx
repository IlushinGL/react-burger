import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { useDrop } from 'react-dnd';
// import { useDrop, useDrag } from 'react-dnd';
// import { useEffect } from 'react';

import conteiner from './burger-components.module.scss';
import { BurgerDraggableComponent } from './burger-component-draggable';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerComponentPlaceholder } from './burger-component-placeholder';

export function BurgerComponents() {
	const [{ isHoverFilling }, dropFillingsTag] = useDrop({
		accept: 'filling',
		drop(itemId) {
			onDropFillingHandler(itemId);
		},
		collect: (monitor) => ({
			isHoverFilling: monitor.isOver(),
		}),
	});
	const [{ isHoverBunTop }, dropBunTagTop] = useDrop({
		accept: 'bun',
		drop(itemId) {
			onDropBunHandler(itemId);
		},
		collect: (monitor) => ({
			isHoverBunTop: monitor.isOver(),
		}),
	});
	const [{ isHoverBunBottom }, dropBunTagBottom] = useDrop({
		accept: 'bun',
		drop(itemId) {
			onDropBunHandler(itemId);
		},
		collect: (monitor) => ({
			isHoverBunBottom: monitor.isOver(),
		}),
	});
	const dispatch = useDispatch();
	const order = useSelector(selectors.burgerConstructor.get_data);
	const order_list = useSelector(selectors.burgerConstructor.get_list);
	const bunId = order[0];
	const bun = useSelector((state) =>
		selectors.burgerConstructor.get_byId(state, bunId)
	);
	const order_list_empty = order_list.length === 0;

	const fillingBorderColor = isHoverFilling ? 'accept' : 'transparent';
	const bunTopBorderColor = isHoverBunTop ? 'accept' : 'transparent';
	const bunBottomBorderColor = isHoverBunBottom ? 'accept' : 'transparent';

	// console.log(order_list_empty);
	function onDropFillingHandler(item) {
		if (order_list_empty) {
			const data = { resiver: '', source: item.id };
			dispatch(actions.burgerConstructor.add_ingredient(data));
			dispatch(actions.burgerIngredients.set_count({ id: item.id, shift: 1 }));
		}
	}

	function onDropBunHandler(data) {
		if (bunId) {
			dispatch(actions.burgerIngredients.set_count({ id: bunId, shift: -2 }));
		}
		dispatch(actions.burgerIngredients.set_count({ id: data.id, shift: 2 }));
		dispatch(actions.burgerConstructor.set_bun(data.id));
	}

	function handlerOnDel(data) {
		// console.log(currentItem);
		dispatch(actions.burgerConstructor.del_ingredient(data.key));
		dispatch(actions.burgerIngredients.set_count({ id: data.id, shift: -1 }));
	}

	function handlerOnDrop(data) {
		const isKey = data.source.slice(0, 4) === 'igl_';
		if (data.source === data.resiver) {
			console.log('ничего не делаем');
			return;
		}
		if (isKey) {
			// console.log('сортируем');
			dispatch(actions.burgerConstructor.move_ingredient(data));
		} else {
			// console.log('добавляем');
			dispatch(actions.burgerConstructor.add_ingredient(data));
			dispatch(
				actions.burgerIngredients.set_count({ id: data.source, shift: 1 })
			);
		}
	}

	// useEffect(() => {
	// 	dispatch(actions.burgerIngredients.set_count(order.arr));
	// }, [dispatch, order.arr]);

	return (
		<section className={conteiner.section}>
			<div ref={dropBunTagTop}>
				{bunId === '' ? (
					<BurgerComponentPlaceholder
						text='сюда перетащите булку...'
						type={1}
						dropColor={bunTopBorderColor}
					/>
				) : (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
						extraClass={conteiner.bun + ' ' + conteiner[bunTopBorderColor]}
					/>
				)}
			</div>
			<div className={conteiner.filling} ref={dropFillingsTag}>
				{order_list_empty ? (
					<BurgerComponentPlaceholder
						text='сюда тащите ингредиенты...'
						type={0}
						dropColor={fillingBorderColor}
					/>
				) : (
					order_list.map((item) => (
						<div key={item.key}>
							<BurgerDraggableComponent
								item={item}
								onDelete={handlerOnDel}
								onDrop={handlerOnDrop}
							/>
						</div>
					))
				)}
			</div>
			<div ref={dropBunTagBottom}>
				{bunId === '' ? (
					<BurgerComponentPlaceholder
						text='булку можно перетащить и сюда...'
						type={-1}
						dropColor={bunBottomBorderColor}
					/>
				) : (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
						extraClass={conteiner.bun + ' ' + conteiner[bunBottomBorderColor]}
					/>
				)}
			</div>
		</section>
	);
}
