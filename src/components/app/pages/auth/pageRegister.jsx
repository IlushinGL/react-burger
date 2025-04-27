import conteiner from './pagesUserAuth.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';
import { fetchUserSet } from '@services/actionsThunk';

import { useFormAndValidation } from '../../../../hooks/useFormAndValidation';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Register() {
	const dispatch = useDispatch();
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation();

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	function handleOnSubmit(e) {
		e.preventDefault();
		if (isValid) {
			dispatch(fetchUserSet(values));
		}
	}

	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
					<div className={conteiner.title}>Регистрация</div>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={handleChange}
						icon={undefined}
						value={values.name || ''}
						name={'name'}
						autoComplete='off'
						required
						minLength={3}
						error={!!errors.name}
						errorText={errors.name}
						size={'default'}
					/>
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
						autoComplete='off'
						name={'password'}
						required
						minLength={6}
						maxLength={8}
						error={!!errors.password}
						errorText={errors.password}
					/>
					<div className={conteiner.button}>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={!isValid}>
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
