import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Alert, ActivityIndicator, StatusBar } from "react-native";
import { RootStackParamList } from "../../Navigations/StackNavigations";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getAuth, signInAnonymously, } from "@react-native-firebase/auth";
import { getDatabase, ref, set } from "@react-native-firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "@react-native-firebase/storage";
import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { saveUserProfile } from "../../Firebase/Profiledata";
import { ScrollView } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  const [name, setName] = useState('');
  const [Bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);


  const users = auth().currentUser;
  console.log('User UID:', users?.uid);
  const [loading, setLoading] = useState(true);

  // 🔹 Anonymous login
  useEffect(() => {
    const signIn = async () => {
      try {
        const authInstance = getAuth();
        let currentUser = authInstance.currentUser;
        if (!currentUser) {
          const { user: anonUser } = await signInAnonymously(authInstance);
          currentUser = anonUser;
        }
        setUser(currentUser);
      } catch (err) {
        console.log("Auth error:", err);
        Alert.alert("Auth Error", "Failed to sign in: " + err);
      } finally {
        setLoading(false);
      }
    };
    signIn();
  }, []);

  // 🔹 Request permissions for camera/gallery
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // 🔹 Image picker functions
  const takePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        includeBase64: true,
        mediaType: 'photo',
      });
      setImage(image.data || null);
    } catch (err) {
      console.log("Camera cancelled or failed ", err);
    }
  };

  const openImageLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        includeBase64: true,
        mediaType: 'photo',
      });
      setImage(image.data || null);
    } catch (err) {
      console.log("Gallery cancelled or failed ", err);
    }
  };

  const chooseImageSource = () => {
    Alert.alert(
      "Select Image Source",
      "Choose a method to update your profile picture",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Gallery", onPress: openImageLibrary },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // 🔹 Save profile to Realtime Database (and optionally upload image)
  const handleSave = async () => {

    if (!name?.trim() || !phone?.trim() || !email?.trim())
      return Alert.alert('Error', 'All fields are required.');
/*

^ → start of the string
\d → any digit (0–9)
{10} → exactly 10 digits
$ → end of the string

*/ 
    if (!/^\d{10}$/.test(phone))
      return Alert.alert('Error', 'Phone number must be 10 digits.');


    /*
    ^       → start of the string
    [^\s@]+ → one or more characters that are not a space (\s) or @
    @       → the literal @ symbol
    [^\s@]+ → domain part (again, no spaces or @)
    \.      → a literal .
    [^\s@]+ → something after the dot (like .com, .in, etc.)
    $       → end of the string
    */ 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Alert.alert('Error', 'Invalid email format.');

    if (!user) {
      Alert.alert('Error', 'User not logged in yet!');
      return;
    }

    phone.trim();
    email.trim();
    email.toLowerCase();
    try {
      const createdAt = "Date:" + new Date().toLocaleDateString() + ' Time:' + new Date().toLocaleTimeString();
      await saveUserProfile({
        uid: user.uid,
        image,
        name,
        Bio,
        phone,
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString()
      });
      Alert.alert('Success', 'Profile saved successfully!');
      console.log('Profile saved successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });

      //  navigation.replace('HomeScreen');
    } catch (err) {
      console.log('Firebase save error:', err);
      Alert.alert('Error', 'Profile save failed: ' + err);
    }
  };

  if (loading)
    return <ActivityIndicator
      size="large"
      color="#6C63FF"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
   <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
   

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Profile</Text>
          </View>
          <View style={{ padding: 20, }}>

            <TouchableOpacity onPress={chooseImageSource}>
              <Image
                style={styles.profileImage}
                resizeMode="stretch"
                source={image ? { uri: `data:image/jpeg;base64,${image}` } : require('../../assets/icon/Profile.jpg')}
              />
            </TouchableOpacity>

            <TextInput
              value={name}
              placeholder="Enter Name"
              placeholderTextColor="#000000ff"
              onChangeText={setName}
              style={styles.input} />
            <TextInput
              value={Bio}
              placeholder="Enter Bio"
              placeholderTextColor="#000000ff"
              onChangeText={setBio}
              style={styles.input} />

            <TextInput
              value={phone}
              placeholder="Enter Phone Number"
              placeholderTextColor="#000000ff"
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad" />
            <TextInput
              value={email}
              placeholder="Enter Email"
              placeholderTextColor="#000000ff"
              onChangeText={setEmail}
              style={styles.input} />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  backgroundColor: '#fff',
    flex: 1
  },
  profileImage:
  {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#6C63FF',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#ccc',
    alignSelf: 'center'
  },
  input: {
    borderColor: '#000000ff',
    padding: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginVertical: 15
  },
  saveButton: {
    marginVertical: 15,
    marginHorizontal: 5,
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },

});

export default ProfileScreen;

