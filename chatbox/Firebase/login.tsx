// Firebase/login.ts
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useModal } from '../Components/ModalComponet';

interface LoginData {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginData): Promise<{ success: boolean }> => {
  const { showModal } = useModal(); 
  try {
    await auth().signInWithEmailAndPassword(email, password);

    Alert.alert('Success', 'Logged in successfully!');
    return { success: true };
  } catch (error: any) {
    console.log('Email login error:', error);

    if (error.code === 'auth/user-not-found') {
      Alert.alert('Error', 'No user found with this email');
    } else if (error.code === 'auth/wrong-password') {
      Alert.alert('Error', 'Incorrect password');
    } else if (error.code === 'auth/invalid-email') {
      Alert.alert('Error', 'Invalid email address');
    } else {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }

    return { success: false };
  }
};

export default login;
