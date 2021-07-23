/*
* Picker.js
* Author: Sagar A. Chitnis
* Purpose: Export a custom `AppPicker` component associated with a corresponding
*          error message
*/

import React from 'react';
import { useFormikContext } from 'formik';

import AppPicker from '../Picker';
import ErrorMessage from './FormError';

function AppFormPicker({
	items,
	name,
	PickerItemComponent,
	placeholder,
	width,
	numberOfColumns,
}) {
	const { errors, setFieldValue, touched, values } = useFormikContext();
	return (
		<>
			<AppPicker
				items={items}
				numberOfColumns={numberOfColumns}
				onSelectItem={(item) => setFieldValue(name, item)}
				placeholder={placeholder}
				selectedItem={values[name]}
				width={width}
				PickerItemComponent={PickerItemComponent}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default AppFormPicker;
