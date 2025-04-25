import conteiner from './pagesUserAuth.module.scss';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPassword() {
	const navigate = useNavigate();
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation();

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	function handleOnSubmit(e) {
		e.preventDefault();
		if (isValid) {
			navigate(APP_PATH.resetPswd);
		}
	}

	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
					<div className={conteiner.title}>Восстановление пароля</div>
					<EmailInput
						onChange={handleChange}
						placeholder='Укажите e-mail'
						value={values.email || ''}
						name={'email'}
						isIcon={false}
						autoComplete='off'
						required
						minLength={5}
						error={!!errors.email}
						errorText={errors.email}
					/>
					<div className={conteiner.button}>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={!isValid}>
							Восстановить
						</Button>
					</div>
				</form>
				<div className={conteiner.other}>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Вспомнили пароль?</div>
						<NavLink to={APP_PATH.login} className={conteiner.link}>
							Войти
						</NavLink>
					</div>
				</div>
			</div>
		</main>
	);
}
