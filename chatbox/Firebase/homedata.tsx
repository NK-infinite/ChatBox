
import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, get } from '@react-native-firebase/database';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';

const fetchUserByUid = async (uid: string) => {
  try {
    const app = getApp();
    const db = getDatabase(app, databaseURL);
    const snapshot = await get(ref(db, `/users/${uid}`));

    if (snapshot.exists()) {
      return { uid, ...snapshot.val() };
    } else {
      console.log("No data found for UID:", uid);
      return null;
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};

export default fetchUserByUid;
