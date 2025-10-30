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



//deleteAccount time ForogetPassword
export const handleForgotPassword = async () => {
  const user = auth().currentUser;
  if (!user?.email) {
    Alert.alert('Error', 'No email associated with your account.');
    return;
  }

  try {
    await auth().sendPasswordResetEmail(user.email);
    Alert.alert(
      'Password Reset Sent',
      'We sent a password reset link to your email. Please reset your password and then try deleting again.'
    );
  } catch (err: any) {
    Alert.alert('Error', err.message);
  }
};
