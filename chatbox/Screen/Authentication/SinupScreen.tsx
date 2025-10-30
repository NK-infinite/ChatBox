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
    Dimensions,
    StatusBar,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { RootStackParamList } from '../../Navigations/StackNavigations';
import styles from '../../styles/Login_Singup';
import { SafeAreaView } from 'react-native-safe-area-context';
import singup from '../../Firebase/singup';
import { useModal } from '../../Components/ModalComponet';
import Social from '../../Components/SocialAthu';
import googleLogin from '../../Firebase/googleAuth';
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// interface Props {
    //   navigation: SignupScreenNavigationProp;
    // }
    
    const SignupScreen = ({ navigation }: { navigation: SignupScreenNavigationProp }) => {
        const [name, setName] = useState('');
        const [email, setemail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const screenWidth = Dimensions.get("window").width;
        const isFolded = screenWidth > 600;
        const { showModal } = useModal(); 
        const handleSignup = async () => {
            if (!name || !email || !password || !confirmPassword) {
            showModal('Error, Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            showModal('Error, Passwords do not match');
            return;
        }
        if (password.length < 6) {
            showModal('Error Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        // Simulate API call
      try {
        // Optionally, update display name
        
        setIsLoading(true);
        
        const result = await singup({ name, email, password }  , showModal)    
        if (result.success) {

            if(result.verifi){
           // navigation.replace('EmailVerification');
             navigation.reset({
        index: 0,
        routes: [{ name: "EmailVerification" }],
      });
        }

         showModal('Success , Account created successfully!');
        }

        setIsLoading(false);
        // Navigate to Home or Login screen after successful signup
        
    } catch (error: any) {
        setIsLoading(false);
        console.log('Email signup error:', error);
    }
};


    return (
<SafeAreaView
            style={styles.container}
        >
            <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
            
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}>
                {/* <LinearGradient
                 colors={[ '#007AFF' ,  '#6C63FF']}
                 style={StyleSheet.absoluteFill}
               /> */}
                <View style={[styles.header , isFolded ? {marginBottom: 0} : {marginBottom: 20}]}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#000000ff"
                            value={name}
                            onChangeText={setName}
                            keyboardType='default'
                        //   autoCapitalize="words"
                        />
                    </View>

                    {/* numer Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Email"
                            placeholderTextColor="#000000ff"
                            value={email}
                            keyboardType='email-address'
                            onChangeText={setemail}
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

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="lock-open" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#000000ff"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Icon
                                name={showConfirmPassword ? 'eye-slash' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
                        onPress={handleSignup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Text style={styles.signupButtonText}>Creating Account...</Text>
                        ) : (
                            <Text style={styles.signupButtonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={[styles.loginContainer , isFolded ? { marginBottom:-30 } : {marginBottom:0}] }>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                  
                 
    <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or continue with</Text>
          <View style={styles.socialButtons}>
            
            <TouchableOpacity 
            onPress={googleLogin}
            style={styles.socialButton}>
              <Icon name="google" size={30} color="#ec2816ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook-f" size={30} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="apple" size={30} color="#ec2816ff" />
            </TouchableOpacity>
          </View>
        </View>

                {/* Terms */}
                <View style={isFolded ?  { flexDirection:'row'  , alignItems:'center',  justifyContent:'center' , marginTop:15 } : {flexDirection:'column', marginTop:40} } >
                     <Text style={[styles.termsText  , isFolded ? {marginRight:5}: {marginBottom:5} ]}> By signing up, you agree to our</Text>
                    <TouchableOpacity
                        style={styles.termsButton}
                        onPress={() => navigation.navigate('terms')}
                    >
                            <Text style={styles.termsLink}>
                                Terms of Service
                                <Text> and </Text>
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                                </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
</SafeAreaView>
    );
};

export default SignupScreen;