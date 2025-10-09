import auth, { sendEmailVerification } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

interface SignupData {
  name: string;
  email: string;
  password: string;
  
}

const singup = async ({ name, email, password }: SignupData ): Promise<{ success: boolean , verifi?:boolean }>  => {
    try {
        


        const userCredential =   await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
    
        let verifi:boolean;
        await user.reload(); // Firebase se fresh info lelo

        try{
        
            await user.sendEmailVerification();
            Alert.alert(`Success, Verification email sent to your email!(${email})`);
            verifi=true; 
            return { success: true , verifi};
            

            
        }catch(e){
            console.log(e);
            Alert.alert(`Verification email (${e})`);
            verifi=false;
            return { success: true , verifi};
        }
        


        
        
        
    } catch (error: any) {
       
        console.log('Email signup error:', error);

        if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Error', 'This email is already in use');
        } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Error', 'Invalid email address');
        } else {
            Alert.alert('Error', 'Failed to create account. Please try again.');
        }
         return { success: false, };
    }
}

export default singup;