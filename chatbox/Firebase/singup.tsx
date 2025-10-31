import auth, { sendEmailVerification } from '@react-native-firebase/auth';
import { useModal } from '../Components/ModalComponet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const singup = async ({ name, email, password }: SignupData, showModal: (msg: string) => void) => {
  //  const { showModal } = useModal(); 
    try {
       // terms and conditions part to be added
       const localTerms = JSON.parse(await AsyncStorage.getItem("terms") || "false");
       const localPrivacy = JSON.parse(await AsyncStorage.getItem("privacy") || "false");

        const userCredential =   await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
        let verifi:boolean;
        await user.reload(); 
        try{
            await user.sendEmailVerification();
            showModal(`Success, Verification email sent to your email!(${email})`);
            AsyncStorage.setItem('name' , name);
            AsyncStorage.setItem('email' , email);
            verifi=true;

            
database().ref(`userAgreements/${user.uid}`).set({
  email: email,
  terms: localTerms,
  privacy: localPrivacy
});
            return { success: true , verifi};  
        }catch(e){
            console.log(e);
            verifi=false;
            return { success: true , verifi};
        }

    } catch (error: any) {
        console.log('Email signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
            showModal('Error , This email is already in use');
        } else if (error.code === 'auth/invalid-email') {
            showModal('Error , Invalid email address');
        } else {
            showModal('Error , Failed to create account. Please try again.');
        }
         return { success: false, };
    }
}

export default singup;

