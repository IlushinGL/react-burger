import conteiner from './pagesUserAuth.module.scss';
import { FormEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';
import { setPswdForgot } from '@services/actionsThunk';

import { useFormAndValidation } from '@utils/hooks/useFormAndValidation';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPassword() {
	const navigate = useNavigate();
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation({ email: '' }, { email: '' });

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (isValid) {
			const isForgot = await setPswdForgot(values);
			if (isForgot) {
				navigate(APP_PATH.resetPswd);
			}
		}
	}

	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
					<div className={conteiner.title}>Восстановление пароля</div>
					<Input
						type='email'
						onChange={handleChange}
						placeholder='Укажите e-mail'
						value={values.email}
						name={'email'}
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
