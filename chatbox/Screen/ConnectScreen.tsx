import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, FlatList, Alert, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase, ref, get, update } from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import styles from "../styles/Home_Connect";

interface User {
    uid: string;
    image: string;
    name: string;
    phone: string;
    email: string;
    connections?: Record<string, boolean>;
    friendRequests?: Record<string, boolean>;
}

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';

const ConnectScreen = () => {

    const [phone, setPhone] = useState('');
    const [searchResult, setSearchResult] = useState<User | null>(null);
    const [requests, setRequests] = useState<User[]>([]);
    const [usersMap, setUsersMap] = useState<Record<string, User>>({});
   const [currentNumber, setCurrentNumber] = useState<string | null>(null);

    const auth = getAuth();
    const currentUid = auth.currentUser?.uid;
  const currentnumber = auth.currentUser?.phoneNumber
    const currentPhone = auth.currentUser?.phoneNumber;
   console.log("Current Number" , currentnumber);
   
    // 🔹 Get database instance with URL
    const db = getDatabase(getApp(), databaseURL);

    
    // 🔹 Fetch  users
    const fetchUserByPhone = async () => {
        if (!phone) return;
        const snapshot = await get(ref(db, `users/${phone}`));
        if (snapshot.exists()) {
            const userData = snapshot.val();
            setSearchResult({ uid: phone, ...userData });
        } else {
            Alert.alert('Not Found', 'User not found.');
            setSearchResult(null);
        }
    };


  

    // 🔹 Fetch incoming requests
  
  const loadUsersAndRequests = async () => {
        if (!currentPhone) {
            console.log("❌ No current phone number");
            return;
        }

        try {
            console.log("🔥 Loading requests for:", currentPhone);
            const usersSnap = await get(ref(db, "users"));
            
            if (!usersSnap.exists()) {
                console.log("❌ No users found in database");
                setRequests([]);
                return;
            }

            const allUsers = usersSnap.val();
            setUsersMap(allUsers);

            // Get current user data
            const currentUserData = allUsers[currentPhone];
            console.log("👀 Current User Data:", currentUserData);

            if (!currentUserData) {
                console.log("❌ Current user not found in users list");
                setRequests([]);
                return;
            }

            // Check friendRequests structure
            const friendRequests = currentUserData.friendRequests;
            console.log("📥 Friend Requests Object:", friendRequests);

            if (friendRequests && typeof friendRequests === 'object') {
                const requestPhones = Object.keys(friendRequests);
                console.log("📞 Request Phone Numbers:", requestPhones);

                const incomingRequests = requestPhones
                    .map(phoneNumber => {
                        const requestingUser = allUsers[phoneNumber];
                        if (requestingUser) {
                            return {
                                uid: phoneNumber,
                                ...requestingUser,
                                phone: phoneNumber, // Ensure phone is set
                                image: requestingUser.image || null
                            };
                        }
                        return null;
                    })
                    .filter((user): user is User => user !== null && user.name !== undefined);

                console.log("✅ Incoming Requests:", incomingRequests);
                setRequests(incomingRequests);
            } else {
                console.log("❌ No friend requests found");
                setRequests([]);
            }
        } catch (error) {
            console.error('Error loading requests:', error);
            Alert.alert('Error', 'Failed to load requests');
        }
    };
  



    // 🔹 Send friend request
    const sendRequest = async () => {
        if (!searchResult) return;
        await update(ref(db, `users/${phone}/friendRequests`), { [currentnumber!]: true });
        Alert.alert('Success', 'Friend request sent!');
        setSearchResult(null);
        setPhone('');
    };

    
    // 🔹 Accept friend request
    
    const acceptRequest = async (uid: string) => {
  if (!currentUid) return;
  
  const updates: any = {};
  // remove request
updates[`users/${currentnumber}/friendRequests/${uid}`] = null; // ✅ USE currentnumber

// add connections on both sides (uid is the sender's phone number/key)
 updates[`users/${currentnumber}/connections/${uid}`] = true; // ✅ USE currentnumber
 updates[`users/${uid}/connections/${currentnumber}`] = true; 

  await update(ref(db), updates);

  setRequests(prev => prev.filter(r => r.uid !== uid));
  Alert.alert("Request Accepted!");
};


    return (
        <SafeAreaView style={{ flex: 1 }}>
<StatusBar barStyle="dark-content" backgroundColor="#6C63FF" />

            <View style={{ flex: 1 }}>
               
                <View style={styles.header}>
                       <Text style={styles.title}>Search your Friend</Text>
                      
                     </View>

<View style={styles.container}>

                <View style={styles.input}>
                    <TextInput
                        placeholder="Search By Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                 <TouchableOpacity
                  onPress={() => fetchUserByPhone()}>
                    <Icon name="magnifying-glass" size={25} color="#6C63FF"  />
                </TouchableOpacity>
                </View>

                {searchResult && (
                    <View style={styles.cardContent}>
              <Image
                source={
                  searchResult.image
                    ? { uri: `data:image/jpeg;base64,${searchResult.image}` }
                    : require("../assets/icon/Profile.jpg")
                }
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{searchResult.name}</Text>
                <Text style={styles.email}>{searchResult.email}</Text>
                <Text style={styles.phone}>{phone}</Text>
              </View>
              <TouchableOpacity
              onPress={()=> sendRequest()}
              style={styles.chatButton}>
                <Icon name="user-plus" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
                )}

            

                <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>Incoming Requests</Text>
                
                <FlatList
                    data={requests}
                    keyExtractor={item => item.uid}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View>

                                <Image
                                  source={
        item.image
            ? { uri: `data:image/jpeg;base64,${item.image}` }
            : require("../assets/icon/Profile.jpg") // Fallback image
    }
                                style={{ width: 50, height: 50, borderRadius: 25 }} />
                            </View>
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.phone}</Text>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => acceptRequest(item.uid)}
                                    style={styles.button}
                                >
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                                    </View>
            <TouchableOpacity 
                
onPress={() => loadUsersAndRequests()}
            >
  <Text>Refresh</Text>
            </TouchableOpacity>


                </View>
        </SafeAreaView>
    );
};


export default ConnectScreen;
