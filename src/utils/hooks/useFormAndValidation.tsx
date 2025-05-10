import { useState, useCallback, ChangeEvent } from 'react';

type TUseFormWithValidation<S> = {
	values: S;
	errors: S;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	resetForm: (newValues?: S, newErrors?: S, newIsValid?: boolean) => void;
	isValid: boolean;
};

export function useFormAndValidation<T>(
	initVals: T,
	initErrs: T
): TUseFormWithValidation<T> {
	const [values, setValues] = useState<T>(initVals);
	const [errors, setErrors] = useState<T>(initErrs);
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const value = input.value;
		const name = input.name;
		const form = e.target.closest('form');
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: input.validationMessage });
		setIsValid(!!form && form.checkValidity());
	};

	const resetForm = useCallback(
		(newValues = initVals, newErrors = initErrs, newIsValid = false) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setValues, setErrors, setIsValid]
	);

	return {
		values,
		handleChange,
		errors,
		isValid,
		resetForm,
	};
}
