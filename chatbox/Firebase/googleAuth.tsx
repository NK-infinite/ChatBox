import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '96012869985-labh4fpmbme61em0jr496n4hg6bki1bm.apps.googleusercontent.com',
});

 const googleLogin = async () => {
    console.log('GoogleAuth file loaded!');

  try {
    // Google Sign-In
     await GoogleSignin.signIn();

    // Latest version me idToken ye path se milega
    const { idToken } = await GoogleSignin.getTokens();

    if (!idToken) throw new Error('Failed to get idToken');

    // Firebase credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Firebase sign in
    const userCredential = await auth().signInWithCredential(googleCredential);
    await AsyncStorage.setItem('isLoggedIn', 'true');
    return userCredential.user; // Firebase user object
  } catch (error) {
    console.log('Google Login Error:', error);
    //throw error;
  }

};

export default googleLogin;

// export const signOut = async () => {
//   try {
//     await GoogleSignin.signOut();
//     await auth().signOut();
//   } catch (error) {
//     console.log('SignOut Error:', error);
//   }
// };
