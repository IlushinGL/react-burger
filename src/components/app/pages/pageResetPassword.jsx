import conteiner from './pagesUserAuth.module.scss';
import { useState } from 'react';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
	const [emailCode, setEmailCode] = useState('');
	const [pswdValue, setPswdlValue] = useState('');
	const onEmaiCodelChange = (e) => {
		setEmailCode(e.target.value);
		// console.log(e.target.validationMessage);
	};
	const onPswdChange = (e) => {
		setPswdlValue(e.target.value);
	};
	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form}>
					<div className={conteiner.title}>Восстановление пароля</div>
					<PasswordInput
						placeholder='Введите новый пароль'
						onChange={onPswdChange}
						value={pswdValue}
						name={'password'}
						autoComplete='off'
						errorText={'здесь должно быть минимум 6 символов'}
					/>
					<Input
						type={'text'}
						placeholder='Введите код из письма'
						onChange={onEmaiCodelChange}
						icon={undefined}
						value={emailCode}
						name={'code'}
						autoComplete='off'
						maxLength={4}
						minLength={4}
						error={emailCode.length > 0 && emailCode.length < 4}
						errorText={'здесь должно быть ровно 4 цифры'}
						size={'default'}
					/>
					<div className={conteiner.button}>
						<Button htmlType='button' type='primary' size='medium'>
							Сохранить
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
