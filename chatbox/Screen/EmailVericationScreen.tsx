import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigations/StackNavigations';
import { useModal } from '../Components/ModalComponet';

type EmailVerificationScreenProp = StackNavigationProp<RootStackParamList, 'EmailVerification'>;

const EmailVerificationScreen = ({ navigation }: { navigation: EmailVerificationScreenProp }) => {
  const { showModal } = useModal(); 
  const handleCheckVerification = async () => {
    const user = auth()?.currentUser;
    await user?.reload(); 

    if (user?.emailVerified) {
      navigation.replace('HomeScreen');
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
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:20 }}>
      <Text style={{ fontSize:18, textAlign:'center', marginBottom:20 }}>
        Please verify your email before logging in.
      </Text>
      <Button title="I have verified" onPress={handleCheckVerification} />
      <View style={{ marginTop:15 }}>
        <Button title="Resend verification email" onPress={handleResendEmail} />
      </View>
    </View>
  );
};

export default EmailVerificationScreen;
