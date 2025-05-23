import conteiner from './pagesUserAuth.module.scss';
import { FormEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';
import { resetPswd } from '@services/actionsThunk';

import { useFormAndValidation } from '@utils/hooks/useFormAndValidation';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
	const navigate = useNavigate();
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation(
			{ password: '', code: '' },
			{ password: '', code: '' }
		);

	useEffect(() => {
		if (!localStorage.getItem('isForgot')) {
			navigate(APP_PATH.forgotPswd);
		}
		resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetForm]);

	async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const isSettingSuccess = await resetPswd(values);
		if (isSettingSuccess) {
			navigate(APP_PATH.login);
		}
	}

	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
					<div className={conteiner.title}>Восстановление пароля</div>
					<PasswordInput
						placeholder='Введите новый пароль'
						onChange={handleChange}
						value={values.password}
						name={'password'}
						autoComplete='off'
						minLength={6}
						maxLength={8}
						required
						// error={!!errors.password}
						errorText={errors.password}
					/>
					<Input
						type={'text'}
						placeholder='Введите код из письма'
						onChange={handleChange}
						icon={undefined}
						value={values.code || ''}
						name={'code'}
						autoComplete='off'
						required
						error={!!errors.code}
						errorText={errors.code}
						size={'default'}
					/>
					<div className={conteiner.button}>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={!isValid}>
							Сохранить
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
