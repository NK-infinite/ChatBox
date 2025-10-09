import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screen/LoginScreen'
import SignupScreen from '../Screen/SinupScreen';
import TermsScreen from '../Screen/TermsPrivacyScreen';
import HomeScreen from '../Screen/HomeScreen';
import EmailVerification from '../Screen/EmailVericationScreen';
import ForgotPasswordScreen from '../Screen/ForgotPassWordScreen';
export type RootStackParamList = {
    HomeScreen: undefined;
    Login: undefined;
    Signup: undefined;
    Forgotpass: undefined;
    terms: undefined;
    OTPVerification: { email: string; purpose: 'signup' | 'reset', confirmation: any };
    EmailVerification: undefined;
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

                    component={SignupScreen}
                />
                <Stack.Screen name="terms"
                    options={
                        {
                            headerShown: false
                        }
                    }
                     component={TermsScreen} />

                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="EmailVerification"
                    component={EmailVerification} />

                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Forgotpass"
                    component={ForgotPasswordScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigations;