import { string, number } from 'prop-types';
import conteiner from './burger-components.module.scss';

export function BurgerComponentPlaceholder({ text, type, dropColor }) {
	const view =
		type < 0 ? conteiner.holder_botton : type === 0 ? '' : conteiner.holder_top;
	return (
		<div className={conteiner.holder + ' ' + conteiner[dropColor] + ' ' + view}>
			{text}
		</div>
	);
}

BurgerComponentPlaceholder.propTypes = {
	text: string,
	type: number,
	dropColor: string,
};
