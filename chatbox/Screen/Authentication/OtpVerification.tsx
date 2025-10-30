import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Keyboard,
    StatusBar,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import styles from '../../styles/Otpverifiy';
import { RootStackParamList } from '../../Navigations/StackNavigations';

type OTPVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPVerificationScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

interface Props {
    navigation: OTPVerificationScreenNavigationProp;
    route: OTPVerificationScreenRouteProp;
}

const OTPVerificationScreen = ({ navigation, route }: Props) => {
    const { email, purpose } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all fields are filled
        if (value && index === 5) {
            Keyboard.dismiss();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            Alert.alert('Error', 'Please enter the complete 6-digit OTP');
            return;
        }

        setIsLoading(true);
        // Simulate API verification
        setTimeout(() => {
            setIsLoading(false);
            if (purpose === 'signup') {
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Success', 'Password reset successful!');
                navigation.navigate('Login');
            }
        }, 1500);
    };

    const handleResendOtp = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        // Simulate resend OTP
        Alert.alert('OTP Sent', 'A new OTP has been sent to your email');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
               <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
               
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Icon name="shield" size={60} color="#007AFF" />
                </View>
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.subtitle}>
                    We've sent a 6-digit verification code to
                </Text>
                <Text style={styles.email}>{email}</Text>
            </View>
         

         
            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={ref => { inputRefs.current[index] = ref }}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                    />
                ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
                style={[styles.verifyButton, isLoading && styles.verifyButtonDisabled]}
                onPress={handleVerify}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Text style={styles.verifyButtonText}>Verifying...</Text>
                ) : (
                    <Text style={styles.verifyButtonText}>Verify OTP</Text>
                )}
            </TouchableOpacity>

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                {canResend ? (
                    <TouchableOpacity onPress={handleResendOtp}>
                        <Text style={styles.resendLink}>Resend OTP</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.timerText}>
                        Resend in 0:{timer.toString().padStart(2, '0')}
                    </Text>
                )}
            </View>

            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-left" size={16} color="#007AFF" style={styles.backIcon} />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


export default OTPVerificationScreen;