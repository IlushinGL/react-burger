import { useSelector } from 'react-redux';
import { selectors } from '@services/selectors';

import { string } from 'prop-types';

import block from './burger-ingredients-type.module.scss';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';

export function BurgerIngredientsType({ type, name }) {
	const blockData = useSelector((state) =>
		selectors.burgerIngredients.get_byType(state, type)
	);

	return (
		<section className={block.group}>
			<div className={block.title}>{name}</div>
			<div className={block.list}>
				{blockData.map((item) => (
					<div key={item._id}>
						<BurgerIngredientsItem item={item} />
					</div>
				))}
			</div>
		</section>
	);
}

BurgerIngredientsType.propTypes = {
	type: string,
	name: string,
};
