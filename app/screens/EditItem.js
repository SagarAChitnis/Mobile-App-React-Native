/*
* EditItem.js
* Author: Sagar A. Chitnis
* Purpose: Screen to edit a posted item listing
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
	AppForm,
	AppFormField,
	AppFormPicker as Picker,
	SubmitButton,
} from '../components/forms';
import CategoryPickerItem from '../components/CategoryPicker';
import Screen from '../components/Screen';
import FormImagePicker from '../components/forms/ImagePicker';
import useLocation from '../hooks/useLocation';
import firebase from '../backend/firebase';
import UploadScreen from './Upload';

// Set input constrains
const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	price: Yup.number().required().min(1).max(10000).label('Price'),
	description: Yup.string().label('Description'),
	category: Yup.object().required().nullable().label('Category'),
	images: Yup.array().min(1, 'Please select at least one image.'),
	expdate: Yup.date()
});

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

// posts the images to firebase storage, creates a new listing with the images urls to firebase storage for the associated image

function ListingEditScreen() {
	//const location = useLocation();
	const location = useLocation();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(false);

	const getCategories = async () => {
		const newArray = [];
		const temp = await db.collection('categories').get();
		temp.forEach((querySnapshot) => {
			const data = querySnapshot.data();
			newArray.push(data);
		});
		// console.log(categories);
		setCategories(newArray);
	};

	// Uploads the food item to Firebase Cloud Storage
	const handleSubmit = async (
		{ category, description, images, price, title, expdate },
		{ resetForm },
	) => {
		setProgress(true);
		const temp = [];

		// Upload the listing data as a blob to the firebase base
		for (let i = 0; i < images.length; i++) {
			const blob = await new Promise((resolve) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = () => {
					resolve(xhr.response);
				};
				xhr.responseType = 'blob';
				xhr.open('GET', images[i], true);
				xhr.send(null);
			});
			const snapshot = await storageRef.child(title + i).put(blob);
			const downloadURL = await snapshot.ref.getDownloadURL();
			temp.push(downloadURL);
		}
		// images.forEach(async (image) => {});
		const uid = firebase.auth().currentUser.uid;
		await Promise.all(temp)


		// Creating a document for the listing with all information and push to firebase
		var docRef = db.collection('listings').doc()
		await docRef.set({
			docid: docRef.id,
			categoryId: category.id,
			title,
			uid,
			price,
			imageURLs: temp,
			description,
			id: title + price,
			location,
			expdate
		})

		setLoading(true);
		resetForm();
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleAnimation = () => {
		setProgress(false);
		setLoading(false);
	};
	return (
		<Screen style={styles.container}>
			<UploadScreen
				isDone={loading}
				onFinish={handleAnimation}
				visible={progress}
			/>
			<AppForm
				initialValues={{
					title: '',
					price: '',
					description: '',
					category: null,
					images: [],
					expdate: '',
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}>
				<FormImagePicker name='images' />
				<AppFormField maxLength={255} name='title' placeholder='Title' />
				<AppFormField
					keyboardType='numeric'
					maxLength={8}
					name='price'
					placeholder='Price'
				// width={120}
				/>
				<Picker
					items={categories}
					name='category'
					numberOfColumns={3}
					PickerItemComponent={CategoryPickerItem}
					placeholder='Category'
				// width='50%'
				/>
				<AppFormField
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>
				<AppFormField
					maxLength={8}
					name='expdate'
					placeholder='Expiry Date: MM/DD/YY'
				/>
				<SubmitButton title='PUT FOR SALE' />
			</AppForm>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
	},
});
export default ListingEditScreen;
