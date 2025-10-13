// firebase/databaseService.js
import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, set } from '@react-native-firebase/database';
import { Alert } from 'react-native';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app'; // <-- apna URL yaha daal

export const saveUserProfile = async (
  uid: string,
  profile: {
    image: any;
    name: string;
    Bio: string;
    phone: string;
    email: string;
    createdAt: string;
  }
) => {
  console.log('📥 Calling saveUserProfile...');

  try {
    const app = getApp();
    const db = getDatabase(app, databaseURL);

    await set(ref(db, `users/${uid}`), profile);

    console.log(' Profile saved successfully!');
    Alert.alert('Success', 'Profile saved successfully!');
  } catch (error) {
    console.error(' Database save error:', error);
    Alert.alert('Error', 'Profile save failed: ' + error);
  }
};
