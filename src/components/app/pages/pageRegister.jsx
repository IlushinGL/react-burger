import conteiner from './pagesUserAuth.module.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Register() {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [pswdValue, setPswdlValue] = useState('');
	const onNameChange = (e) => {
		setNameValue(e.target.value);
	};
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
					<div className={conteiner.title}>Регистрация</div>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onNameChange}
						icon={undefined}
						value={nameValue}
						name={'name'}
						autoComplete='off'
						error={nameValue.length > 0 && nameValue.length < 3}
						errorText={'здесь должно быть минимум 3 буквы'}
						size={'default'}
					/>
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
						autoComplete='off'
						name={'password'}
						errorText={'здесь должно быть минимум 6 символов'}
					/>
					<div className={conteiner.button}>
						<Button htmlType='button' type='primary' size='medium'>
							Зарегистрироваться
						</Button>
					</div>
				</form>
				<div className={conteiner.other}>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Уже зарегистрированы?</div>
						<NavLink to={APP_PATH.login} className={conteiner.link}>
							Войти
						</NavLink>
					</div>
				</div>
			</div>
		</main>
	);
}
