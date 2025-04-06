import { array, func } from 'prop-types';
import { useState } from 'react';
import conteiner from './burger-ingredients.module.scss';
import { BurgerIngredientsType } from './burger-ingredients-type/burger-ingredients-type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredients({ data, onClick }) {
	const GoTo = () => {
		const [current, setCurrent] = useState('Булки');
		return (
			<div className={conteiner.tab}>
				<Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab
					value='Начинка'
					active={current === 'Начинка'}
					onClick={setCurrent}>
					Начинка
				</Tab>
			</div>
		);
	};
	return (
		<section className={conteiner.section}>
			<p className='text text_type_main-large mt-10 mb-5'>Соберите бургер</p>
			<GoTo />
			<div className={conteiner.ingrediets}>
				<BurgerIngredientsType
					type='bun'
					name='Булки'
					data={data}
					onClick={onClick}
				/>
				<BurgerIngredientsType
					type='sauce'
					name='Соусы'
					data={data}
					onClick={onClick}
				/>
				<BurgerIngredientsType
					type='main'
					name='Начинки'
					data={data}
					onClick={onClick}
				/>
			</div>
		</section>
	);
}

BurgerIngredients.propTypes = {
	data: array,
	onClick: func,
};
