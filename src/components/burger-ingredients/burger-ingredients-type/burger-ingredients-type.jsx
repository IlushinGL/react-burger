import block from './burger-ingredients-type.module.scss';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';

export function BurgerIngredientsType({ type, name, data }) {
	const blockData = data.filter((item) => item.type === type);
	if (blockData.length === 0) {
		return null;
	}
	blockData.sort((a, b) => (a.name < b.name ? -1 : 1));
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
