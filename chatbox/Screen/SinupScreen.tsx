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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { RootStackParamList } from '../Navigations/StackNavigations';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Login_Singup';
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// interface Props {
    //   navigation: SignupScreenNavigationProp;
    // }
    
    const SignupScreen = ({ navigation }: { navigation: SignupScreenNavigationProp }) => {
        const [name, setName] = useState('');
        const [number, setEmail] = useState('');
        const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const screenWidth = Dimensions.get("window").width;
        const isFolded = screenWidth > 600;
    const handleSignup = async () => {
        if (!name || !number || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('OTPVerification', { number, purpose: 'signup' });
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}>
                {/* <LinearGradient
                 colors={[ '#007AFF' ,  '#6C63FF']}
                 style={StyleSheet.absoluteFill}
               /> */}
                <View style={styles.header}>
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
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                            keyboardType='default'
                        //   autoCapitalize="words"
                        />
                    </View>

                    {/* numer Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="phone number"
                            placeholderTextColor="#999"
                            value={number}
                            keyboardType='numeric'
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
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
                            placeholderTextColor="#999"
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
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Terms */}
                <View style={isFolded ?  { flexDirection:'row'  , alignItems:'center', justifyContent:'center' } : {flexDirection:'column'} } >
                     <Text style={styles.termsText}> By signing up, you agree to our</Text>
                    <TouchableOpacity
                        style={styles.termsButton}
                        onPress={() => navigation.navigate('terms')}
                    >
                       
                            <Text style={styles.termsLink}>Terms of Service
                                <Text> and </Text>
                                <Text style={styles.termsLink}>Privacy Policy</Text></Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;