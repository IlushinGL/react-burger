import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { useDrop } from 'react-dnd';
// import { useDrop, useDrag } from 'react-dnd';
import { useEffect } from 'react';

import conteiner from './burger-components.module.scss';
import { BurgerDraggableComponent } from './burger-component-draggable';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerComponents() {
	const [{ isHoverFilling }, dropFillingsTag] = useDrop({
		accept: 'filling',
		// drop(itemId) {
		// 	onDropFillingHandler(itemId);
		// },
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
	const order = useSelector(selectors.burgerConstructor.get);
	const ingredients = useSelector(selectors.burgerIngredients.get_all);

	const bun = ingredients.find((element) => element._id === order.data.bun);
	const fillingBorderColor = isHoverFilling ? 'accept' : 'transparent';
	const bunTopBorderColor = isHoverBunTop ? 'accept' : 'transparent';
	const bunBottomBorderColor = isHoverBunBottom ? 'accept' : 'transparent';

	// function onDropFillingHandler(data) {
	// 	console.log(id);
	// 	dispatch(actions.burgerConstructor.add_ingredient(data.id));
	// }

	function onDropBunHandler(data) {
		// console.log(id);
		dispatch(actions.burgerConstructor.set_bun(data.id));
	}

	function handlerOnDel(data) {
		// console.log(currentItem);
		dispatch(actions.burgerConstructor.del_ingredient(data.key));
	}

	function handlerOnDrop(data) {
		const isKey = data.source.slice(0, 4) === 'igl_';
		if (data.source === data.resiver) {
			console.log('ничего не делаем');
			return;
		}
		if (isKey) {
			console.log('сортируем');
			dispatch(actions.burgerConstructor.move_ingredient(data));
		} else {
			console.log('добавляем');
			dispatch(actions.burgerConstructor.add_ingredient(data));
		}
	}

	useEffect(() => {
		dispatch(actions.burgerIngredients.set_count(order.arr));
	}, [dispatch, order.arr]);

	return (
		<section className={conteiner.section}>
			<div ref={dropBunTagTop}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={conteiner.bun + ' ' + conteiner[bunTopBorderColor]}
				/>
			</div>
			<div
				className={conteiner.filling + ' ' + conteiner[fillingBorderColor]}
				ref={dropFillingsTag}>
				{order.data.filling.map((item) => (
					<div key={item.key}>
						<BurgerDraggableComponent
							item={item}
							onDelete={handlerOnDel}
							onDrop={handlerOnDrop}
						/>
					</div>
				))}
			</div>
			<div ref={dropBunTagBottom}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={conteiner.bun + ' ' + conteiner[bunBottomBorderColor]}
				/>
			</div>
		</section>
	);
}
