import header from './app-header.module.scss';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderItem } from './app-header-item/app-header-item';

export function AppHeader() {
	return (
		<header className={header.panel}>
			<div className={header.content}>
				<nav
					className={header.navigation}
					style={{
						justifySelf: 'left',
					}}>
					<HeaderItem
						name='burger'
						text='Конструктор'
						link='...'
						enabled={true}
					/>
					<HeaderItem
						name='list'
						text='Лента заказов'
						link='...'
						enabled={false}
					/>
				</nav>
				<Logo />
				<div
					style={{
						justifySelf: 'right',
					}}>
					<HeaderItem
						name='profile'
						text='Личный кабинет'
						link='...'
						enabled={false}
					/>
				</div>
			</div>
		</header>
	);
}
