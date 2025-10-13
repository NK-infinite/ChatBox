import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const testFirebaseConnection = async () => {
  try {
    // 1️⃣ Sign in anonymously
    const userCredential = await auth().signInAnonymously();
    console.log('✅ Firebase Auth UID:', userCredential.user.uid);

    // 2️⃣ Write fixed data under /users/1
    await database().ref('/users/1').set({
      email: 'example@gmail.com',
      name: 'Nikhil',
      phone: '76543345',
    });
    console.log('✅ Data write successful');

    // 3️⃣ Read back the data
    const snapshot = await database().ref('/users/1').once('value');
    if (snapshot.exists()) {
      console.log('✅ Read successful:', snapshot.val());
      Alert.alert('✅ Firebase Connected', JSON.stringify(snapshot.val()));
    } else {
      console.log('⚠️ No data found at /users/1');
      Alert.alert('⚠️ Firebase', 'No data found at /users/1');
    }
  } catch (error: any) {
    console.error('❌ Error:', error);
    Alert.alert('❌ Firebase Error', error.message || error.toString());
  }
};
