/*
* Register.js
* Author: Sagar A. Chitnis
* Purpose: Registration form for the app
*/

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import firebase from '../backend/firebase';

// YUP schema validation for Input fields on the registration form
const validationSchema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(6).label('Password'),
	phone: Yup.string().required().min(10).max(10).label('Phone Number'),
});

// Registering a new user in the Firebase DB
const db = firebase.firestore();

const onRegisterPress = async ({ email, password, phone, name }) => {
	try {
		const { user } = await firebase
			.auth() // Firebase storesthe user in the local persistence on the app
			.createUserWithEmailAndPassword(email, password); // creates new user on the cloud user db
		const userRef = db.doc(`users/${user.uid}`);
		const snapshot = await userRef.get();
		if (!snapshot.exists) {
			try {
				// creating new user
				await userRef.set({
					name,
					email,
					phone,
				});
			} catch (error) {
				console.log('error', error.message);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

function RegisterScreen() {
	return (
		<Screen style={styles.container}>
			<Image style={styles.logo} source={require('../assets/register2.png')} />
			<AppForm
				initialValues={{ name: '', email: '', password: '', phone: '' }}
				onSubmit={onRegisterPress}
				validationSchema={validationSchema}>
				<AppFormField
					autoCorrect={false}
					icon='account'
					name='name'
					placeholder='Name'
				/>
				<AppFormField
					autoCapitalize='none'
					autoCorrect={false}
					icon='email'
					keyboardType='email-address'
					name='email'
					placeholder='Email'
					textContentType='emailAddress'
				/>
				<AppFormField
					autoCapitalize='none'
					autoCorrect={false}
					icon='lock'
					name='password'
					placeholder='Password'
					secureTextEntry
					textContentType='password'
				/>
				<AppFormField
					autoCapitalize='none'
					autoCorrect={false}
					icon='phone'
					keyboardType='numeric'
					name='phone'
					placeholder='Phone Number'
				/>
				<SubmitButton title='Register ' />
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
		marginTop: 10,
		marginBottom: 0,
	},
});

export default RegisterScreen;
