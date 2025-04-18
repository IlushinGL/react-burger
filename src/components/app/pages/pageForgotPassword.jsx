import conteiner from './pagesUserAuth.module.scss';
import { useState } from 'react';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPassword() {
	const [emailValue, setEmailValue] = useState('');
	const onEmailChange = (e) => {
		setEmailValue(e.target.value);
	};
	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form}>
					<div className={conteiner.title}>Восстановление пароля</div>
					<EmailInput
						onChange={onEmailChange}
						placeholder='Укажите e-mail'
						value={emailValue}
						name={'email'}
						isIcon={false}
						autoComplete='off'
						errorText={'актуальный адрес вашей электронной почты'}
					/>
					<div className={conteiner.button}>
						<Button htmlType='button' type='primary' size='medium'>
							Восстановить
						</Button>
					</div>
				</form>
				<div className={conteiner.other}>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Вспомнили пароль?</div>
						<div className={conteiner.link}>Войти</div>
					</div>
				</div>
			</div>
		</main>
	);
}
