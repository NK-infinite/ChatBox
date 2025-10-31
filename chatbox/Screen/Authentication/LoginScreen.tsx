import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import { RootStackParamList } from '../../Navigations/StackNavigations';
import styles from '../../styles/Login_Singup';
import login from '../../Firebase/login';
import ModalProvider, { useModal } from '../../Components/ModalComponet';
import Social from '../../Components/SocialAthu';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// interface Props {
//   navigation: LoginScreenNavigationProp;
// }

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showModal } = useModal();

  const handleLogin = async () => {
    if (!email || !password) {
      showModal("Error Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const result = await login({ email, password }, showModal);
    setIsLoading(false);
    if (result.success) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });

    }
  };

  return (
     <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     >
    <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* <LinearGradient
        colors={[ '#007AFF' ,  '#6C63FF']}
        style={StyleSheet.absoluteFill}
      /> */}

      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      <View style={styles.form}>
        {/* Number Input */}
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#000000ff"
            value={email}
            onChangeText={setemail}
            keyboardType='email-address'
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000000ff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgotpass')}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.loginButtonText}>Signing In...</Text>
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {/* <Social navigation={navigation} /> */}

    </ScrollView>
     </KeyboardAvoidingView>
  );
};

export default LoginScreen;