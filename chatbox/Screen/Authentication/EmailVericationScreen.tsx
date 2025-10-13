import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/StackNavigations';
import { useModal } from '../../Components/ModalComponet';
import styles from '../../styles/Otpverifiy';

type EmailVerificationScreenProp = StackNavigationProp<RootStackParamList, 'EmailVerification'>;

const EmailVerificationScreen = ({ navigation }: { navigation: EmailVerificationScreenProp }) => {
  const { showModal } = useModal();
  
  useEffect(() => {
  const timer = setTimeout(() => {
    handleCheckVerification();
  }, 3000); 
  return () => clearTimeout(timer);
}, []);

  const handleCheckVerification = async () => {
    const user = auth()?.currentUser;
    await user?.reload();
    if (user?.emailVerified) {
      navigation.navigate('ProfileScreen');
      showModal('Verified , Your email is verified! Welcome.');
    } else {
      showModal('Not Verified , Please verify your email first.');
    }
  };

  const handleResendEmail = async () => {
    try {
      await auth().currentUser?.sendEmailVerification();
      showModal(' Sent Again , Verification email re-sent. Check your inbox.');
    } catch (error: any) {
      console.log('Resend error:', error);
      showModal('Error , Failed to resend verification email.');
    }
  };

  return (
    <View style={style.contener}>
      <Text style={style.hadding}>
        Please verify your email before logging in.
      </Text>
      <View style={{flexDirection:'column' , alignContent:'space-evenly' ,justifyContent:'space-evenly'}}>
     <View>
      <TouchableOpacity
       style={style.button}
       onPress={handleCheckVerification}>
        <Text style={style.buttontext}>I have verified</Text>
      </TouchableOpacity>
        </View>

      <View>
        <TouchableOpacity
        style={style.button}
        onPress={handleResendEmail}>
          <Text style={style.buttontext }>Resend verification email</Text>
        </TouchableOpacity>
        </View>

      </View>
      <View>
        <Text style={{ fontSize:15}} >{`Did't receive the email? Check your spam folder.\n`}</Text>
        <Text style={{color:'red' ,fontSize:15}} >Note:Wait Some Second Click "I have verified"</Text>
      </View>
    </View>
  );
};

export default EmailVerificationScreen;


const style = StyleSheet.create({
  contener: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  hadding: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'normal',
  },
  button:{
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  buttontext:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }



});