import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, get } from '@react-native-firebase/database';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app'; // <-- apna URL yaha daal

const fetchDataOnce = async () => {
  try {
    const app = getApp();
    const db = getDatabase(app, databaseURL); // <-- URL specify kiya
    const dataRef = ref(db, `/users`); // <-- replace with your actual path
    const snapshot = await get(dataRef); // .get() is the modular equivalent of .once('value')

    if (snapshot.exists()) {
        
      console.log('User data: ', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found at this path.');
      return null;
    }
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
};

export default fetchDataOnce;