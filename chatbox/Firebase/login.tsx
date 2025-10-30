// Firebase/login.ts
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useModal } from '../Components/ModalComponet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

interface LoginData {
  email: string;
  password: string;
}
const login = async ({ email, password }:  LoginData ,showModal: (msg: string) => void ) => {
 // const { showModal } = useModal(); 
  try {
    await auth().signInWithEmailAndPassword(email, password);

    showModal('Success , Logged in successfully!');
    await AsyncStorage.setItem('isLoggedIn', 'true');
    return { success: true };
  } catch (error: any) {
    console.log('Email login error:', error);

    if (error.code === 'auth/user-not-found') {
      showModal('Error , No user found with this email');
    } else if (error.code === 'auth/wrong-password') {
      showModal('Error , Incorrect password');
    } else if (error.code === 'auth/invalid-email') {
      showModal('Error , Invalid email address');
    } else {
      showModal('Error , Failed to login. Please try again.');
    }

    return { success: false };
  }
};

export default login;

