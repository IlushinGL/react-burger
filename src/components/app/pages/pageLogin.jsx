import conteiner from './pagesUserAuth.module.scss';
import { useState } from 'react';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Login() {
	const [emailValue, setEmailValue] = useState('bob@example.com');
	const [pswdValue, setPswdlValue] = useState('12345');
	const onEmailChange = (e) => {
		setEmailValue(e.target.value);
	};
	const onPswdChange = (e) => {
		setPswdlValue(e.target.value);
	};
	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form}>
					<div className={conteiner.title}>Вход</div>
					<EmailInput
						onChange={onEmailChange}
						value={emailValue}
						name={'email'}
						isIcon={false}
						autoComplete='off'
						errorText={'актуальный адрес вашей электронной почты'}
					/>
					<PasswordInput
						onChange={onPswdChange}
						value={pswdValue}
						name={'password'}
						autoComplete='off'
						errorText={'здесь должно быть минимум 6 символов'}
					/>
					<div className={conteiner.button}>
						<Button htmlType='button' type='primary' size='medium'>
							Войти
						</Button>
					</div>
				</form>
				<div className={conteiner.other}>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Вы — новый пользователь?</div>
						<div className={conteiner.link}>Зарегистрироваться</div>
					</div>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Забыли пароль?</div>
						<div className={conteiner.link}>Восстановить пароль</div>
					</div>
				</div>
			</div>
		</main>
	);
}
