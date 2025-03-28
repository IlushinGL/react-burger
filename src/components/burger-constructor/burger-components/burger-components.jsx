import conteiner from './burger-components.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerComponents({ ingredients, data }) {
	const bun = ingredients.find((element) => element._id === data.bun);
	const filling = ingredients.filter((element) =>
		data.filling.includes(element._id)
	);
	return (
		<section className={conteiner.section}>
			<div className={conteiner.bun}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>

			{filling.map((item) => (
				<div className={conteiner.filling} key={item._id}>
					<DragIcon type='primary' />
					<ConstructorElement
						text={item.name}
						price={item.price}
						thumbnail={item.image}
					/>
				</div>
			))}

			<div className={conteiner.bun}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
		</section>
	);
}
