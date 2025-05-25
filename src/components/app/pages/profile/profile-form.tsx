import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@services/store';
import { selectors } from '@services/selectors';
import { fetchUserUpdate } from '@services/actionsThunk';
import conteiner from './profile.module.scss';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormAndValidation } from '@utils/hooks/useFormAndValidation';

interface IuserData {
	name: string;
	email: string;
	password: string;
}

export function ProfileForm() {
	const dispatch = useAppDispatch();
	const userData = useSelector(selectors.currentUser.get_user);
	const initValues: IuserData = {
		name: userData ? userData.name : '',
		email: userData ? userData.email : '',
		password: '',
	};
	const [isChanged, setIsChanged] = useState(false);
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation(initValues, { name: '', email: '', password: '' });

	useEffect(() => {
		resetForm(initValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	useEffect(() => {
		let changed = false;
		for (const key in values) {
			if (
				values[key as keyof typeof values] !==
				initValues[key as keyof typeof initValues]
			) {
				changed = true;
				break;
			}
		}
		setIsChanged(changed);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (isValid && isChanged) {
			dispatch(fetchUserUpdate(values));
		}
	}

	return (
		<form className={conteiner.form} onSubmit={handleOnSubmit} noValidate>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={handleChange}
				icon={values.name === initValues.name ? 'CheckMarkIcon' : 'EditIcon'}
				value={values.name}
				name={'name'}
				autoComplete='off'
				required
				minLength={3}
				error={!!errors.name}
				errorText={errors.name}
				size={'default'}
			/>
			<Input
				type={'email'}
				placeholder={'Логин'}
				onChange={handleChange}
				icon={values.email === initValues.email ? 'CheckMarkIcon' : 'EditIcon'}
				value={values.email}
				name={'email'}
				autoComplete='off'
				required
				minLength={5}
				error={!!errors.email}
				errorText={errors.email}
				size={'default'}
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				onChange={handleChange}
				icon={
					values.password === initValues.password ? 'CheckMarkIcon' : 'EditIcon'
				}
				value={values.password}
				name={'password'}
				autoComplete='off'
				minLength={6}
				error={!!errors.password}
				errorText={errors.password}
				size={'default'}
			/>
			<div className={conteiner.buttons}>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					onClick={() => resetForm(initValues)}
					disabled={!isChanged}>
					Отмена
				</Button>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={!isValid || !isChanged}>
					Сохранить
				</Button>
			</div>
		</form>
	);
}
