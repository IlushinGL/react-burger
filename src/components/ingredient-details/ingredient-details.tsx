import { useParams } from 'react-router-dom';
import { selectors } from '@services/selectors';
import { useAppSelector } from '@services/store';
import conteiner from './ingredient-details.module.scss';

export function IngredientDetailes() {
	const { id } = useParams();
	const item = useAppSelector((state) =>
		selectors.burgerIngredients.get_byId(state, id)
	);

	if (!item) {
		return null;
	}
	return (
		<section className={conteiner.content} data-testid='ingredient-detailes'>
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
