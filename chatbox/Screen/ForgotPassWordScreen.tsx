import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/Login_Singup';
import forgotPassword from '../Firebase/forgotpassword';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigations/StackNavigations';
import { useModal } from '../Components/ModalComponet';

type ForgotPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const ForgotPasswordScreen = ({ navigation }: { navigation: ForgotPasswordNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const { showModal } = useModal(); 
  const handleResetPassword = async () => {
    if (!email) {
      showModal('Please enter your email');
      return;
    }

    setIsLoading(true);
    const result = await forgotPassword({email});
    setIsLoading(false);

    if (result.success) {
      navigation.navigate('Login'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ForgotPasswordScreen;



