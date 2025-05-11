import conteiner from './app-header-item.module.scss';
import { NavLink } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IHiderItemProps {
	name: string;
	text: string;
	link: string;
}
interface IactiveProps {
	active: boolean;
}

export function HeaderItem({ name, text, link }: IHiderItemProps) {
	function Icon({ active }: IactiveProps) {
		const type = active ? 'primary' : 'secondary';
		if (name === 'burger') {
			return <BurgerIcon type={type} />;
		} else if (name === 'list') {
			return <ListIcon type={type} />;
		}
		return <ProfileIcon type={type} />;
	}

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				isActive
					? conteiner.item + ' ' + conteiner.active
					: conteiner.item + ' ' + conteiner.inactive
			}>
			{({ isActive }) => {
				return (
					<>
						<Icon active={isActive} />
						{text}
					</>
				);
			}}
		</NavLink>
	);
}
