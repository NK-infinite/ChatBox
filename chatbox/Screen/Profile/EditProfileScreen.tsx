import { View, Text, TextInput, Button, TouchableOpacity, Alert, Image, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { saveUserProfile } from '../../Firebase/Profiledata'
import { useEffect, useState } from 'react'
import { getAuth } from '@react-native-firebase/auth'
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ScreenContentWrapper } from 'react-native-screens'
import fetchUserByUid from '../../Firebase/homedata'
import { getDatabase, onValue, ref, set } from '@react-native-firebase/database'
import { User } from '@react-native-google-signin/google-signin'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { KeyboardAvoidingView } from 'react-native'

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
    const [image, setImage] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')

    useEffect(() => {
        const auth = getAuth();
        const uid = auth?.currentUser?.uid;
        const db = getDatabase();
        const userRef = ref(db, `/users/${uid}/`);

        const unsubscribe = onValue(userRef, async (snapshot) => {
            if (!snapshot.exists()) return;

            const userData = { uid: uid, ...snapshot.val() };
            // console.log("currentUser", userData);
            setName(userData?.name);
            setBio(userData?.bio);
            setPhone(userData?.phone);
            setImage(userData?.image);
            setUserName(userData?.username);
            console.log(userData?.uid);

        });
        return unsubscribe;

    }, [])

    const handleSave = async () => {
        try {

            const auth = getAuth();
            const uid = auth?.currentUser?.uid;

            if (!uid) {
                Alert.alert("Error", "User not logged in!");
                return;
            }


            await saveUserProfile({
                uid,
                image,
                name,
                Bio: bio,
                phone,
                email: email.toLowerCase().trim(),
                createdAt: new Date().toISOString()
            });
            navigation.replace("HomeScreen");
            console.log("Profile saved successfully!");

        } catch (error) {
            console.log(error);

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
    // 🔹 Image picker functions
    const takePhoto = async () => {
        const options: ImageLibraryOptions =
        {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        };
        const response = await launchCamera(options);
        if (response.assets && response.assets.length > 0)
            setImage(response.assets[0].base64 || null);
    };

    const openImageLibrary = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
            includeBase64: true
        };
        const response = await launchImageLibrary(options);
        if (response.assets && response.assets.length > 0)
            setImage(response.assets[0].base64 || null);
    };

    return (
        <KeyboardAvoidingView
            behavior='height'
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, }}>
              <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
              
                <ScrollView style={{ flex: 1 }}>
                    <View style={[styles.header, { position: 'relative' }]}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name='arrow-left' size={25} color={'#fff'} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Update Profile</Text>

                    </View>
                    <View style={styles.container}>
                        <View style={styles.profileImageContainer}>
                            <TouchableOpacity onPress={chooseImageSource}>
                                <Image
                                    style={styles.profileImage}
                                    resizeMode="stretch"
                                    source={image ? { uri: `data:image/jpeg;base64,${image}` } : require('../../assets/icon/Profile.jpg')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={{ color: '#000000ff' }}>UserName:</Text>
                            <View
                                style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }]}
                            >
                                <TextInput
                                    placeholder="UserName"
                                    placeholderTextColor="#000000ff"
                                    value={`${username}`}
                                    editable={false}
                                    style={{ color: '#e21515ff' }}
                                    onChangeText={setUserName}
                                />
                                <Text style={{ color: '#e21515ff' }}>Don't Edit</Text>
                            </View>
                            <Text style={{ color: '#000000ff' }}>Name:</Text>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor="#000000ff"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                            <Text style={{ color: '#000000ff' }}>Bio:</Text>
                            <TextInput
                                placeholder="Bio"
                                placeholderTextColor="#000000ff"
                                value={bio}
                                onChangeText={setBio}
                                style={styles.input}
                            />
                            <Text style={{ color: '#000000ff' }}>Phone:</Text>
                            <TextInput
                                placeholder="Phone"
                                placeholderTextColor="#000000ff"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.input}
                            />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    inputContainer: {

        marginBottom: 20,
    },
    input: {

        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 50,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    profileImage:
    {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        alignSelf: 'center'
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
        fontWeight: 'bold',
        fontSize: 20,
    },
    logoutButton: {
        marginTop: 10,
        marginHorizontal: 5,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#FF9900',
        elevation: 5
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    deleteButton: {
        marginTop: 10,
        marginBottom: 30,
        marginHorizontal: 5,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#E32636',
        elevation: 5
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    },

})