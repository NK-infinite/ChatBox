import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigations/StackNavigations';
import fetchUserByUid from "../Firebase/homedata";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import { getAuth } from "@react-native-firebase/auth";
import styles from "../styles/Home_Connect";
import { getDatabase, onValue, ref } from "@react-native-firebase/database";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface User {
  uid: string;
  image?: string;
  name: string;
  email: string;
  phone: string;
  connections?: Record<string, boolean>;
}

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const auth = getAuth();
  const currentUid = auth?.currentUser?.uid;
  useEffect(() => {
    if (!currentUid) return;

    const db = getDatabase();
    const userRef = ref(db, `/users/${currentUid}`);

    const unsubscribe = onValue(userRef, async (snapshot) => {
      if (!snapshot.exists()) return;

      const userData = { uid: currentUid, ...snapshot.val() };
      setCurrentUser(userData);

      // Fetch friends LIVE
      const connections = userData.connections || {};
      const friendList: User[] = [];

      for (const uid in connections) {
        if (connections[uid]) {
          const friendData = await fetchUserByUid(uid);
          if (friendData) friendList.push(friendData);
        }
      }

      setFriends(friendList);
    });

    // 🧹 Cleanup listener when screen unmounts
    return () => unsubscribe();
  }, [currentUid]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#6C63FF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ChatBox</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")}>
          <Icon name="user-circle" size={34} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('chatScreen', { chatId: item.uid, phone: item.phone })}
          >
            <View style={styles.cardContent}>
              <Image
                source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require("../assets/icon/Profile.jpg")}
                style={styles.avatar}
              />

              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>

              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => navigation.navigate('chatScreen', { chatId: item.uid, phone: item.phone })}
              >
                <Icon name="message" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
                   

      {/* Floating Add Friend Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("ConnectScreen")}
      >
        <Icon name="user-plus" size={28} color="#fff" />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default HomeScreen;
