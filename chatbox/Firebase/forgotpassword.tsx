// Firebase/forgotPassword.ts
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useModal } from '../Components/ModalComponet';


interface Forgotpass {
  email: string;
 
}

const forgotPassword = async ({email}: Forgotpass): Promise<{ success: boolean }> => {
const { showModal } = useModal(); 
  try {
    await auth().sendPasswordResetEmail(email);
    showModal('Success , Password reset link sent to your email!');
    return { success: true };
  } catch (error: any) {
    console.log('Forgot password error:', error);

    if (error.code === 'auth/user-not-found') {
      showModal('Error , No user found with this email');
    } else if (error.code === 'auth/invalid-email') {
      showModal('Error , Invalid email address');
    } else {
      showModal('Error , Failed to send password reset email. Try again.');
    }
    return { success: false };
  }
};

export default forgotPassword;
