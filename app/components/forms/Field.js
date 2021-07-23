/*
* Field.js
* Author: Sagar A. Chitnis
* Purpose: Export an `AppFormField` which is a single field in the form
*          associated with a corresponding error message
*/

import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../TextInput';
import ErrorMessage from './FormError';

function AppFormField({ name, width, ...otherProps }) {
	const {
		setFieldTouched,
		setFieldValue,
		errors,
		touched,
		values,
	} = useFormikContext();
	return (
		<>
			<AppTextInput
				onChangeText={(text) => setFieldValue(name, text)}
				value={values[name]}
				onBlur={() => setFieldTouched(name)}
				width={width}
				{...otherProps}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default AppFormField;
