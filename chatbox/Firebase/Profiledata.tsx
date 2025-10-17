// firebase/databaseService.js
import { getApp } from '@react-native-firebase/app';
// set के बजाय update का उपयोग करें ताकि हम एक साथ कई स्थानों को अपडेट कर सकें
import { getDatabase, ref, set, update } from '@react-native-firebase/database'; 
import { Alert } from 'react-native';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app'; // <-- अपना URL यहाँ डाल

export const saveUserProfile = async (
  uid: string,
  profile: {
    image: any;
    name: string;
    Bio: string;
    phone: string; // Ensure phone is always part of the profile
    email: string;
    createdAt: string;
  }
) => {
  console.log('📥 Calling saveUserProfile...');
 
  try {
    const app = getApp();
    const db = getDatabase(app, databaseURL);

    const updates: Record<string, any> = {}; 

    updates[`users/${uid}`] = profile;
   
 
    if (profile.phone && profile.phone.length > 0) { 
      updates[`phoneNumbersToUids/${profile.phone}`] = uid;
     
    }
    await update(ref(db), updates); 

    console.log('✅ Profile saved and phone index updated successfully!');
    Alert.alert('Success', 'Profile saved successfully!');
  } catch (error) {
    console.error('❌ Database save error:', error, '; Error message:', (error as Error).message);
    Alert.alert('Error', 'Profile save failed: ' + (error as Error).message);
  }
};
