/*
* SubmitButton.js
* Author: Sagar A. Chitnis
* Purpose: Export a `SubmitButton` component which is a wrapper around `AppButton`
*          and uses Formik`s `handleSubmit` procedure
*/

import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../Button';

function SubmitButton({ title }) {
    const { handleSubmit } = useFormikContext();
    return (
        <AppButton title={title} onPress={handleSubmit} />
    );
}

export default SubmitButton;