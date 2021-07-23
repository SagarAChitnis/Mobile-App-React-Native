/*
* Login.js
* Author: Sagar A. Chitnis
* Purpose: Presents a login form and handles user authentication
*/

import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
	ErrorMessage,
	AppForm,
	AppFormField,
	SubmitButton,
} from '../components/forms';
import firebase from '../backend/firebase';

// Validation Schema to check the email and password
const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({ }) {
	const [loginFailed, setloginFailed] = useState(false);

	// Authenticate credentials from Firebase User Details
	const onLoginPress = ({ email, password }) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log(firebase.auth().currentUser.uid);
			})
			.catch(() => {
				setloginFailed(true);
				// stay on the same screen
			});
	};

	return (
		<Screen style={styles.container}>
			<Image style={styles.logo} source={require('../assets/login2.png')} />
			<AppForm
				initialValues={{ email: '', password: '', loginFailed }}
				validationSchema={validationSchema}
				onSubmit={onLoginPress}>
				<ErrorMessage
					error='Invalid Username or Password'
					visible={loginFailed}
				/>
				<AppFormField
					name='email'
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					textContentType='emailAddress'
					placeholder='Email'
					icon='email'
				/>
				<AppFormField
					name='password'
					autoCapitalize='none'
					autoCorrect={false}
					icon='lock'
					placeholder='Password'
					textContentType='password'
					secureTextEntry={true}
				/>
				<SubmitButton title='Login ' />
			</AppForm>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	logo: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 50,
		marginBottom: 0,
	},
});

export default LoginScreen;
