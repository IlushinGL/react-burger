import { useEffect, useState } from 'react';
import conteiner from './profile.module.scss';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormAndValidation } from '../../../../hooks/useFormAndValidation';

export function ProfileForm() {
	const initValues = { name: 'yyy', email: 'dd@dd.d', password: '' };
	const [isChanged, setIsChanged] = useState(false);
	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation();

	useEffect(() => {
		resetForm(initValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let changed = false;
		for (let key in values) {
			if (values[key] !== initValues[key]) {
				changed = true;
				break;
			}
		}
		setIsChanged(changed);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	return (
		<form className={conteiner.form}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={handleChange}
				icon={values.name === initValues.name ? 'CloseIcon' : 'EditIcon'}
				value={values.name || ''}
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
				icon={values.email === initValues.email ? 'CloseIcon' : 'EditIcon'}
				value={values.email || ''}
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
					values.password === initValues.password ? 'CloseIcon' : 'EditIcon'
				}
				value={values.password || ''}
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

// Home.propTypes = {
// 	onSubmit: func,
// };
