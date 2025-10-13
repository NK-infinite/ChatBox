import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screen/Authentication/LoginScreen'
import SignupScreen from '../Screen/Authentication/SinupScreen';
import TermsScreen from '../Screen/Authentication/TermsPrivacyScreen';
import HomeScreen from '../Screen/HomeScreen';
import EmailVerification from '../Screen/Authentication/EmailVericationScreen';
import ForgotPasswordScreen from '../Screen/Authentication/ForgotPassWordScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnectScreen from '../Screen/ConnectScreen';

export type RootStackParamList = {
    HomeScreen: undefined;
    Login: undefined;
    Signup: undefined;
    ProfileScreen: undefined;
    Forgotpass: undefined;
    terms: undefined;
    OTPVerification: { email: string; purpose: 'signup' | 'reset', confirmation: any };
    EmailVerification: undefined;
    ConnectScreen: undefined;
};


const StackNavigations = () => {
 const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };
    checkLoginStatus();
  }, []);


  if (isLoggedIn === null) {
    return null; // ya <ActivityIndicator size="large" /> while loading
  }    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "Login"}>
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
                    name="ProfileScreen"
                    options={
                        {
                            headerShown:false
                        }
                    }
                    component =  {ProfileScreen}/>

                <Stack.Screen
                 options={
                        {
                            headerShown: false
                        }
                    }
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
                    <Stack.Screen
                    options={{
                        headerShown: false 
                    }}
                    name="ConnectScreen"
                    component={ConnectScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigations;

