// firebase/databaseService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, set, update } from '@react-native-firebase/database'; 
import { Alert } from 'react-native';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app'; // <-- अपना URL यहाँ डाल

export const saveUserProfile = async (profile: {
  uid: string;
  image?: string | null;
  name?: string;
  Bio?: string;
  phone?: string;
  email?: string;
  createdAt?: string;
}) => {
  console.log('📥 Calling saveUserProfile...');

  try {
  
    const db = getDatabase();
    const userRef = ref(db, `users/${profile.uid}`);
  
    const updateData: Record<string, any> = {};
    if (profile.image !== undefined) updateData.image = profile.image;
    if (profile.name) updateData.name = profile.name.trim();
    if (profile.Bio) updateData.bio = profile.Bio.trim(); 
    if (profile.phone) updateData.phone = profile.phone;
    if (profile.email) updateData.email = profile.email;
    if (profile.createdAt) updateData.createdAt = profile.createdAt;

    //  Only update specific fields, keep username safe
    await update(userRef, updateData);

    //  Keep phone mapping separate
    if (profile.phone) {
      await update(ref(db), {
        [`phoneNumbersToUids/${profile.phone}`]: profile.uid,
      });
    }

     
    
     console.log('Profile updated successfully');
    Alert.alert('Success', 'Profile updated successfully!');
  } catch (err) {
    console.error(' Database save error', err);
    Alert.alert('Error', 'Profile update failed: ' + err);
  }
};
function database() {
  throw new Error('Function not implemented.');
}

