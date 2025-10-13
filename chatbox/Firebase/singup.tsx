import auth, { sendEmailVerification } from '@react-native-firebase/auth';
import { useModal } from '../Components/ModalComponet';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const singup = async ({ name, email, password }: SignupData, showModal: (msg: string) => void) => {
  //  const { showModal } = useModal(); 
    try {
        const userCredential =   await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
    
        let verifi:boolean;
        await user.reload(); 

        try{
            await user.sendEmailVerification();
            showModal(`Success, Verification email sent to your email!(${email})`);
            verifi=true; 
            await AsyncStorage.setItem('isLoggedIn', 'true');
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
