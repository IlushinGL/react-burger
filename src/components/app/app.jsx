// import { useState } from 'react';
import main from './app.module.scss';
import { INGREDIENTS_DATA } from '@utils/ingredients-data';
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
					<BurgerConstructor />

					{/* <h1>React + TS</h1>
					<div className={main.card}>
						<button onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</button>
					</div> */}
				</div>
			</div>
		</main>
	);
};
