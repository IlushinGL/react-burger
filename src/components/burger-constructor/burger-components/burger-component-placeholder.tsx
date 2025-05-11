import conteiner from './burger-components.module.scss';

interface IBurgerComponentPlaceholderProps {
	text: string;
	type: number;
	dropColor: string;
}

export function BurgerComponentPlaceholder({
	text,
	type,
	dropColor,
}: IBurgerComponentPlaceholderProps) {
	const view =
		type < 0 ? conteiner.holder_botton : type === 0 ? '' : conteiner.holder_top;
	return (
		<div className={conteiner.holder + ' ' + conteiner[dropColor] + ' ' + view}>
			{text}
		</div>
	);
}
