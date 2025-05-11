import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import conteiner from './home.module.scss';

import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

interface IHomeProps {
	onSubmit: () => void;
}

export function Home({ onSubmit }: IHomeProps) {
	return (
		<main className={conteiner.data}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor onClick={onSubmit} />
			</DndProvider>
		</main>
	);
}
