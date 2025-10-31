import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screen/Authentication/LoginScreen'
import SignupScreen from '../Screen/Authentication/SinupScreen';
import TermsScreen from '../Screen/Authentication/TermsPrivacyScreen';
import HomeScreen from '../Screen/HomeScreen';
import EmailVerification from '../Screen/Authentication/EmailVericationScreen';
import ForgotPasswordScreen from '../Screen/Authentication/ForgotPassWordScreen';
import ProfileScreen from '../Screen/Profile/ProfileScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnectScreen from '../Screen/ConnectScreen';
import chatScreen from '../Screen/chatScreen';
import EditProfileScreen from '../Screen/Profile/EditProfileScreen';
import UsernameScreen from '../Screen/UsernameScreen';
import SettingsScreen from '../Screen/Profile/SettingScreen';
import { get, getDatabase, ref } from '@react-native-firebase/database';
import { getAuth } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';

export type RootStackParamList = {
    HomeScreen: undefined;
    Login: undefined;
    Signup: undefined;
    ProfileScreen: undefined;
    UsernameScreen: undefined;
    EditProfileScreen: undefined;
    Forgotpass: undefined;
    Settings: undefined;
    terms: undefined;
    OTPVerification: { email: string; purpose: 'signup' | 'reset', confirmation: any };
    EmailVerification: undefined;
    ConnectScreen: undefined;
    chatScreen: { chatId: string, phone: string };
};


const StackNavigations = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | undefined>(undefined);


useEffect(() => {
  const checkUserState = async () => {
    const user = getAuth().currentUser;

    //  Step 1: Not logged in
    if (!user) {
      setInitialRoute('Signup');
      return;
    }

    await user.reload(); // refresh current state

    //  Step 2: Handle Email verification
    const emailVerifiedBefore = await AsyncStorage.getItem('emailVerified');
    if (!user.emailVerified && !emailVerifiedBefore) {
      setInitialRoute('EmailVerification');
      return;
    }

    //  Once verified, mark it permanently
    if (user.emailVerified && !emailVerifiedBefore) {
      await AsyncStorage.setItem('emailVerified', 'true');
    }

    // 🔹 Step 3: Fetch user data
    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      setInitialRoute('UsernameScreen');
      return;
    }

    const data = snapshot.val();

    //  Step 4: Username check
    if (!data.username || data.username.trim() === '') {
      setInitialRoute('UsernameScreen');
      return;
    }

    //  Step 5: Profile completion check
    const requiredFields = ['phone', 'username', 'email', 'name'];
    const incomplete = requiredFields.some(
      (field) => !data[field] || data[field].trim() === ''
    );

    if (incomplete) {
      setInitialRoute('ProfileScreen');
      return;
    }

    //  Step 6: All good → Home
    setInitialRoute('HomeScreen');
  };
  checkUserState();
}, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
<Stack.Navigator initialRouteName={initialRoute}>

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
                <Stack.Screen
                name="UsernameScreen" 
             options=   {
                    {
                        
                        headerShown: false
                    }
                }
                component={UsernameScreen} />
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
                            headerShown: false
                        }
                    }
                    component={ProfileScreen} />
               <Stack.Screen
               options={
                {
                    headerShown:false
                }
               }
               name="Settings" 
                component={SettingsScreen} />

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
                name='EditProfileScreen'
                 options={
                        {
                            headerShown: false
                        }
                    }
                component={EditProfileScreen} />

                <Stack.Screen
                    name="EmailVerification"
                     options={
                        {
                            headerShown: false
                        }
                    }
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
          
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name='chatScreen'
                    component={chatScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default StackNavigations;