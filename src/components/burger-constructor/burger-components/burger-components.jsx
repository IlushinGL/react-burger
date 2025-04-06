import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@services/actions';
import { selectors } from '@services/selectors';

import { array, object, func } from 'prop-types';
import { useEffect } from 'react';
import conteiner from './burger-components.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerComponents({ onTotal }) {
	const dispatch = useDispatch();
	const order = useSelector(selectors.burgerConstructor.get);
	const ingredients = useSelector(selectors.burgerIngredients.get_all);

	const bun = ingredients.find((element) => element._id === order.data.bun);
	const filling = order.data.filling.map((item) => {
		return {
			key: item.key,
			data: ingredients.find((element) => element._id === item.id),
		};
	});

	useEffect(() => {
		const total = filling.reduce((sum, item) => {
			return sum + item.data.price;
		}, 2 * bun.price);
		onTotal(total);
	}, [bun.price, dispatch, filling, onTotal]);

	useEffect(() => {
		dispatch(actions.burgerIngredients.set_count(order.arr));
	}, [dispatch, order.arr]);

	return (
		<section className={conteiner.section}>
			<ConstructorElement
				type='top'
				isLocked={true}
				text={`${bun.name} (верх)`}
				price={bun.price}
				thumbnail={bun.image}
				extraClass={conteiner.bun}
			/>
			{/* <ConstructorElement
				type='top'
				isLocked={true}
				text={'выберите булку'}
				price={'?'}
				thumbnail={'?'}
				extraClass={conteiner.bun}
			/> */}
			<div className={conteiner.filling}>
				{filling.map((item) => (
					<div className={conteiner.ingredient} key={item.key}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item.data.name}
							price={item.data.price}
							thumbnail={item.data.image}
						/>
					</div>
				))}
			</div>

			<ConstructorElement
				type='bottom'
				isLocked={true}
				text={`${bun.name} (низ)`}
				price={bun.price}
				thumbnail={bun.image}
				extraClass={conteiner.bun}
			/>
		</section>
	);
}

BurgerComponents.propTypes = {
	ingredients: array,
	data: object,
	onTotal: func,
};
