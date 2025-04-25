import { APP_PATH } from '@utils/customConfig';
import header from './app-header.module.scss';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderItem } from './app-header-item/app-header-item';

export function AppHeader() {
	return (
		<header className={header.panel}>
			<div className={header.content}>
				<nav className={header.navigation}>
					<HeaderItem name='burger' text='Конструктор' link={APP_PATH.home} />
					<HeaderItem name='list' text='Лента заказов' link={APP_PATH.list} />
				</nav>
				<Logo />
				<div className={header.right}>
					<HeaderItem
						name='profile'
						text='Личный кабинет'
						link={APP_PATH.profile}
					/>
				</div>
			</div>
		</header>
	);
}
