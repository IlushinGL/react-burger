import conteiner from './app-header-item.module.scss';
import { clsx } from 'clsx';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function HeaderItem({
	name = '',
	text = '',
	link = '',
	enabled = true,
}) {
	if (!name) {
		return null;
	}

	const isActive = (link && enabled) || false;
	const typeIcon = isActive ? 'primary' : 'secondary';
	const clsName = isActive
		? conteiner.item
		: clsx(conteiner.item, conteiner.item_disabled);

	return (
		<div className={clsName}>
			{name === 'burger' ? (
				<BurgerIcon type={typeIcon} />
			) : name === 'list' ? (
				<ListIcon type={typeIcon} />
			) : (
				<ProfileIcon type={typeIcon} />
			)}
			{text}
		</div>
	);
}
