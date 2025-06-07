import { useState, useRef } from 'react';
import conteiner from './burger-ingredients.module.scss';
import { BurgerIngredientsType } from './burger-ingredients-type/burger-ingredients-type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredients() {
	const [typeId, setTypeId] = useState(0);
	const val = ['Булки', 'Соусы', 'Начинки'];
	const refList = useRef<HTMLDivElement>(null);
	const refBun = useRef<HTMLDivElement>(null);
	const refSause = useRef<HTMLDivElement>(null);
	const refMain = useRef<HTMLDivElement>(null);

	function handlerScroll() {
		if (
			!refList.current ||
			!refBun.current ||
			!refSause.current ||
			!refMain.current
		) {
			setTypeId(0);
			return;
		}
		const top = refList.current.getBoundingClientRect().top + 180;
		const bun = refBun.current.getBoundingClientRect();
		const sause = refSause.current.getBoundingClientRect();
		let index: number;

		if (bun.top + bun.height - top > 0) {
			index = 0;
		} else if (sause.top + sause.height - top > 0) {
			index = 1;
		} else {
			index = 2;
		}
		setTypeId(index);
	}

	const Tabs = ({ id }: { id: number }) => {
		const [current, setCurrent] = useState(val[id]);
		function handlerClick(value: string) {
			setCurrent(value);
			const behavior: ScrollIntoViewOptions = { behavior: 'smooth' };
			if (value === val[0]) {
				refBun.current?.scrollIntoView(behavior);
			} else if (value === val[1]) {
				refSause.current?.scrollIntoView(behavior);
			} else {
				refMain.current?.scrollIntoView(behavior);
			}
		}

		return (
			<div className={conteiner.tab}>
				<Tab value={val[0]} active={current === val[0]} onClick={handlerClick}>
					{val[0]}
				</Tab>
				<Tab value={val[1]} active={current === val[1]} onClick={handlerClick}>
					{val[1]}
				</Tab>
				<Tab value={val[2]} active={current === val[2]} onClick={handlerClick}>
					{val[2]}
				</Tab>
			</div>
		);
	};

	return (
		<section className={conteiner.section} data-testid='burger-constructor'>
			<p className='text text_type_main-large mt-10 mb-5'>Соберите бургер</p>
			<Tabs id={typeId} />
			<div
				className={conteiner.ingrediets}
				onScroll={handlerScroll}
				ref={refList}>
				<div ref={refBun}>
					<BurgerIngredientsType type='bun' name={val[0]} />
				</div>
				<div ref={refSause}>
					<BurgerIngredientsType type='sauce' name={val[1]} />
				</div>
				<div ref={refMain}>
					<BurgerIngredientsType type='main' name={val[2]} />
				</div>
			</div>
		</section>
	);
}
