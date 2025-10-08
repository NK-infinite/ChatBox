import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screen/LoginScreen'
import SignupScreen from '../Screen/SinupScreen';
import TermsScreen from '../Screen/TermsPrivacyScreen';
import OTPVerificationScreen from '../Screen/OtpVerification';

export type RootStackParamList = {
    HomeScreen: undefined;
    Login: undefined;
    Signup: undefined;
    terms: undefined;
   OTPVerification: { number: string; purpose: 'signup' | 'reset' }; 

};
const StackNavigations = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login"
                options={
                    {
                        headerShown: false
                    }
                }
                component={LoginScreen} />
                <Stack.Screen name="Signup" 
                options={
                    {
                        headerShown: false
                    }
                }
                component={SignupScreen} />
                <Stack.Screen name="terms"
                options={
                    {
                        headerShown: false
                    }
                } component={TermsScreen} />
                <Stack.Screen 
                options={
                    {
                        headerShown: false
                    }
                }
                name="OTPVerification"
                 component={OTPVerificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigations;