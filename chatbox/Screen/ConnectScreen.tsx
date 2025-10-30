import React, { useEffect, useState, useCallback } from "react"; // useCallback जोड़ा गया
import { View, TextInput, Button, Text, FlatList, Alert, StyleSheet, Image, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native"; // ActivityIndicator जोड़ा गया
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase, ref, get, update, onValue } from '@react-native-firebase/database'; // onValue listener के लिए जोड़ा गया
import { getApp } from '@react-native-firebase/app';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import styles from "../styles/Home_Connect";
import { acceptFriendRequest, rejectFriendRequest } from "../Firebase/accept_reject_Request";
import { sendFriendRequest } from "../Firebase/sendRequest";

interface User {
    uid: string;
    image?: string; // This should be a URL or Base64 string
    name: string;
    phone: string;
    email: string;
    connections?: Record<string, boolean>; // Users this user is connected with
    friendRequests?: Record<string, boolean>; // Incoming friend requests (from other users)
}

// Ensure this matches your default RTDB URL or is simply omitted if default
const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';

const ConnectScreen = () => {
    const [phone, setPhone] = useState('');
    const [searchResult, setSearchResult] = useState<User | null>(null);
    const [incomingRequests, setIncomingRequests] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const db = getDatabase(undefined, databaseURL);

    // 1️ Get current user UID and profile
    useEffect(() => {
        const AtiveUser = auth.onAuthStateChanged(user => {
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, snapshot => {
                    if (snapshot.exists()) {
                        setCurrentUser({ uid: user.uid, ...snapshot.val() });
                    }
                });
            }
        });

        return () => AtiveUser();
    }, []);

    // 2️ Load incoming friend requests
    useEffect(() => {
        if (!currentUser?.friendRequests) {
            setIncomingRequests([]);
            return;
        }

        setLoading(true);
        const fetchRequests = async () => {

            const uids = Object.keys(currentUser.friendRequests!);

            const requests: User[] = [];

            for (let i = 0; i < uids.length; i++) {
                const uid = uids[i];
                const snap = await get(ref(db, `users/${uid}`));
                if (snap.exists()) {
                    requests.push({ uid, ...snap.val() });
                }
            }
            setIncomingRequests(requests);
            setLoading(false);
        };
        fetchRequests();
    }, [currentUser]);

    // 3️ Search user by phone
  const fetchUserByPhone = async () => {
  if (!phone.trim()) {
    Alert.alert("Input Required", "Enter phone number or @username!");
    return;
  }

  setLoading(true);
  setSearchResult(null);

  try {
    let input = phone.trim().toLowerCase();
   
    let uid: string | null = null;

    //  1️ Try username first
    const usernameSnap = await get(ref(db, `usernames/${input}`));
    if (usernameSnap.exists()) {
      uid = usernameSnap.val();
    }

    //  2️ If username not found → try phone
    if (!uid) {
      const phoneSnap = await get(ref(db, `phoneNumbersToUids/${input}`));
      if (phoneSnap.exists()) {
        uid = phoneSnap.val();
      }
    }

    //  If nothing found
    if (!uid) {
      Alert.alert("Not Found", "No matching user found.");
      return;
    }

    //  Self search check
    if (uid === currentUser?.uid) {
      Alert.alert("Info", "This is your own account!");
      return;
    }

    //  Fetch Full Profile
    const userSnap = await get(ref(db, `users/${uid}`));
    if (userSnap.exists()) {
      setSearchResult({ uid, ...userSnap.val() });
    }

  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to fetch user!");
  } finally {
    setLoading(false);
  }
};

    const handleAccept = async (uid: string) => {
        if (!currentUser) return;
        setLoading(true);
        await acceptFriendRequest(currentUser.uid, uid);
        setIncomingRequests(prev => prev.filter(r => r.uid !== uid));
        Alert.alert('Connected!', 'Friend request accepted.');
        setLoading(false);
    };

    // Reject request
    const handleReject = async (uid: string) => {
        if (!currentUser) return;
        setLoading(true);
        await rejectFriendRequest(currentUser.uid, uid);
        setIncomingRequests(prev => prev.filter(r => r.uid !== uid));
        Alert.alert('Rejected!', 'Friend request rejected.');
        setLoading(false);
    };

    // Send request

    const handleSendRequest = async () => {
        if (!searchResult || !currentUser) return;
        setLoading(true);
        try {
            await sendFriendRequest(currentUser.uid, searchResult.uid);
            Alert.alert('Success', 'Friend request sent!');
            setSearchResult(null);
            setPhone('');
        } catch (err: any) {
            Alert.alert('Oops!', err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
            
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Search your Friend</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Search By Phone/Username"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="default"
                            style={{ flex: 1 }}
                            editable={!loading} // Disable input when loading
                        />
                        <TouchableOpacity
                            onPress={fetchUserByPhone}
                            style={styles.searchButton}
                            disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Icon name="magnifying-glass" size={20} color="#6C63FF" />
                            )}
                        </TouchableOpacity>
                    </View>

                    {loading && <ActivityIndicator size="large" color="#6C63FF" style={{ marginVertical: 10 }} />}

                    {searchResult && (
                        <View style={[styles.cardContent, { marginTop: 10, marginBottom: 10 }]}>
                            <Image
                                source={searchResult.image
                                    ? { uri: `data:image/jpeg;base64,${searchResult.image}` }
                                    : require("../assets/icon/Profile.jpg")}
                                style={styles.avatar}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{searchResult.name}</Text>
                                <Text style={styles.email}>{searchResult.email}</Text>
                                <Text style={styles.phone}>{searchResult.phone}</Text>
                            </View>
                            <TouchableOpacity onPress={handleSendRequest} style={styles.chatButton} disabled={loading}>
                                <Icon name="user-plus" size={15} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>Incoming Requests</Text>
                    {incomingRequests.length === 0 ? (
                        <Text style={{ marginTop: 10 }}>No Incoming Requests</Text>
                    ) : (
                        <FlatList
                            data={incomingRequests}
                            keyExtractor={item => item.uid}
                            renderItem={({ item }) => (
                                <View style={[styles.cardContent, { marginTop: 10, marginBottom: 10 }]}>
                                    <Image
                                        source={item.image
                                            ? { uri: `data:image/jpeg;base64,${item.image}` }
                                            : require("../assets/icon/Profile.jpg")}
                                        style={styles.avatar}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.email}>{item.email}</Text>
                                        <Text style={styles.phone}>{item.phone}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 5 }}>
                                        <TouchableOpacity onPress={() => handleReject(item.uid)} style={styles.chatButton} disabled={loading}>
                                            <Icon name="x" size={18} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleAccept(item.uid)} style={styles.chatButton} disabled={loading}>
                                            <Icon name="check" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ConnectScreen;
