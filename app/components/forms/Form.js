/*
* Form.js
* Author: Sagar A. Chitnis
* Purpose: Exports an `AppForm` component that wraps a `Formik` component
*/

import React from 'react';

import { Formik } from 'formik';

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            { () => <>{children}</>}
        </Formik>
    );
}

export default AppForm;