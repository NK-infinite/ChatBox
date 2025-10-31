import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import { get, getDatabase, ref, remove } from "@react-native-firebase/database";
import { useState } from "react";
import { Alert } from "react-native";
import DeleteAccountModal from "../Components/deleteAccountmodal";


export const logout = async ({ navigation }: any) => {
    Alert.alert('Logout', 'Are you sure you want to logout?',
        [
            { text: 'Cancel', style: 'cancel' },

            {
                text: 'Logout',style: 'destructive', onPress: async () => {
                    try {
                        await auth().signOut();
                        await AsyncStorage.removeItem('isLoggedIn');
                        console.log('logout Succsesfull');
                        Alert.alert('Success', 'Logout successfully!');
                      //  navigation.replace('Login');
                           navigation.reset({
  index: 0,
  routes: [{ name: "Login" }],
});
                    } catch (error) {
                        console.log('Logout Error:', error);
                        Alert.alert('Error', 'Failed to logout: ' + error);
                    }
                }
            }
        ]);
}


export const deleteAccount = async (password: string, navigation: any) => {
  const user = auth().currentUser;
  if (!user) {
    Alert.alert('Error', 'No user logged in.');
    return;
  }

  try {
    // 🔹 Step 1: Reauthenticate with password
    const credential = auth.EmailAuthProvider.credential(user.email!, password);
    await user.reauthenticateWithCredential(credential);

    const uid = user.uid;
    const db = getDatabase();

    // 🔹 Step 2: Fetch user data
    const userSnap = await get(ref(db, `users/${uid}`));
    if (!userSnap.exists()) throw new Error('User not found');
    const { phone, username } = userSnap.val();

    // 🔹 Step 3: Delete all related data
    await Promise.all([
      remove(ref(db, `users/${uid}`)),
      phone && remove(ref(db, `phoneNumbersToUids/${phone}`)),
      username && remove(ref(db, `usernames/${username}`)),
      remove(ref(db, `userAgreements/${uid}`)),
      remove(ref(db, `connections/${uid}`)),
      remove(ref(db, `messages/${uid}`)),
    ]);

    // 🔹 Step 4: Delete Firebase auth account
    await user.delete();

    // 🔹 Step 5: Clear local data and redirect
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('terms');
    await AsyncStorage.removeItem('privacy');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

    Alert.alert('Success', 'Your account has been deleted permanently.');
  } catch (error: any) {
    console.log('Delete Error:', error);
    if (error.code === 'auth/wrong-password') {
      Alert.alert('Error', 'Incorrect password. Please try again.');
    } else if (error.code === 'auth/requires-recent-login') {
      Alert.alert('Error', 'Please log in again before deleting your account.');
    } else {
      Alert.alert('Error', error.message);
    }
  }
};