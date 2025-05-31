/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useAppDispatch } from '@services/store';
import conteiner from './profile.module.scss';
import { ProfileForm } from './profile-form';
import { MyOrdersStack } from '@components/orders-stack/orders-stack';
import { fetchLogOut } from '@services/actionsThunk';

export function Profile() {
	const dispatch = useAppDispatch();
	const captions = [
		'В этом разделе вы можете изменить свои персональные данные',
		'В этом разделе вы можете посмотреть свои заказы',
	];
	const [item, setItem] = useState(0);

	function handlerProfileClick() {
		setItem(0);
	}

	function handlerOrdersClick() {
		setItem(1);
	}

	function handlerExitClick() {
		dispatch(fetchLogOut());
	}
	return (
		<main className={conteiner.data}>
			<nav className={conteiner.nav}>
				<div
					className={
						conteiner.button + ' ' + (item === 0 ? conteiner.active : '')
					}
					onClick={handlerProfileClick}>
					Профиль
				</div>
				<div
					className={
						conteiner.button + ' ' + (item === 1 ? conteiner.active : '')
					}
					onClick={handlerOrdersClick}>
					История заказов
				</div>
				<div className={conteiner.button} onClick={handlerExitClick}>
					Выход
				</div>
				<div className={conteiner.caption}>{captions[item]}</div>
			</nav>
			{item === 0 ? <ProfileForm /> : <MyOrdersStack statusVisible={true} />}
		</main>
	);
}
