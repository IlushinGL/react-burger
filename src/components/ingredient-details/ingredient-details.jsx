import { object } from 'prop-types';
import conteiner from './ingredient-details.module.scss';

export function IngredientDetailes({ item }) {
	if (!item) {
		return null;
	}
	return (
		<section>
			<img className={conteiner.image} src={item.image_large} alt={item.name} />
			<div className={conteiner.name}>{item.name}</div>
			<div className={conteiner.nutrition}>
				<div className={conteiner.value}>
					<div className={conteiner.value_header}>{'Калории, ккал'}</div>
					<div className={conteiner.value_digit}>{item.calories}</div>
				</div>
				<div className={conteiner.value}>
					<div className={conteiner.value_header}>{'Белки, г'}</div>
					<div className={conteiner.value_digit}>{item.proteins}</div>
				</div>
				<div className={conteiner.value}>
					<div className={conteiner.value_header}>{'Жиры, г'}</div>
					<div className={conteiner.value_digit}>{item.fat}</div>
				</div>
				<div className={conteiner.value}>
					<div className={conteiner.value_header}>{'Углеводы, г'}</div>
					<div className={conteiner.value_digit}>{item.carbohydrates}</div>
				</div>
			</div>
		</section>
	);
}

IngredientDetailes.propTypes = {
	item: object,
};
