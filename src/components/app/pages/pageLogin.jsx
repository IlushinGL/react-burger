import conteiner from './pagesUserAuth.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { APP_PATH } from '@utils/customConfig';
import { NavLink } from 'react-router-dom';
import { fetchLogIn } from '@services/actionsThunk';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Login() {
	const dispatch = useDispatch();
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation();

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	function handleOnSubmit(e) {
		e.preventDefault();
		if (isValid) {
			dispatch(fetchLogIn(values));
		}
	}

	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
					<div className={conteiner.title}>Вход</div>
					<EmailInput
						onChange={handleChange}
						value={values.email || ''}
						name={'email'}
						isIcon={false}
						required
						minLength={5}
						autoComplete='off'
						error={!!errors.email}
						errorText={errors.email}
					/>
					<PasswordInput
						onChange={handleChange}
						value={values.password || ''}
						name={'password'}
						autoComplete='off'
						minLength={6}
						maxLength={8}
						required
						error={!!errors.password}
						errorText={errors.password}
					/>
					<div className={conteiner.button}>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={!isValid}>
							Войти
						</Button>
					</div>
				</form>
				<div className={conteiner.other}>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Вы — новый пользователь?</div>
						<NavLink to={APP_PATH.register} className={conteiner.link}>
							Зарегистрироваться
						</NavLink>
					</div>
					<div className={conteiner.content}>
						<div className={conteiner.text}>Забыли пароль?</div>
						<NavLink to={APP_PATH.forgotPswd} className={conteiner.link}>
							Восстановить пароль
						</NavLink>
					</div>
				</div>
			</div>
		</main>
	);
}
