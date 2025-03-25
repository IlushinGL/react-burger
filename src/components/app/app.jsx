// import { useState } from 'react';
import main from './app.module.scss';
import { INGREDIENTS_DATA } from '@utils/ingredients-data';
import { BURGER_DATA } from '@utils/burger-data';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

export const App = () => {
	// const num = 0
	// const [count, setCount] = useState(0);
	const ingedientsData = INGREDIENTS_DATA.map((item) => {
		return { ...item, count: 1 };
	});
	return (
		<main className={main.main}>
			<div className={main.conteiner}>
				<AppHeader />
				<div className={main.data}>
					<BurgerIngredients data={ingedientsData} />
					<BurgerConstructor ingredients={ingedientsData} data={BURGER_DATA} />
				</div>
			</div>
		</main>
	);
};
