/*
* Upload.js
* Author: Sagar A. Chitnis
* Purpose: Screen to display an uploading animation when an item is uploaded
*/

import React from 'react';
import { ActivityIndicator, View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

import colors from '../config/colors';
import AppText from '../components/Text';

function UploadScreen({ isDone, onFinish, visible = false }) {
	return (
		<Modal visible={visible}>
			<View style={styles.container}>
				<AppText style={styles.text}>Uploading Item...</AppText>
				{!isDone ? (
					<ActivityIndicator size='large' color={colors.primary} />
				) : (
						<LottieView
							autoPlay
							loop={false}
							onAnimationFinish={onFinish}
							source={require('../assets/animations/done.json')}
							style={styles.animation}
						/>
					)}
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	animation: {
		width: 300,
	},
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		marginVertical: 30
	},
	text: {
		fontSize: 35,
		color: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 25
	}
});

export default UploadScreen;
