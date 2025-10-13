import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigations/StackNavigations';
import fetchDataOnce from "../Firebase/homedata";
import { SafeAreaView } from "react-native-safe-area-context";
import  Icon from "react-native-vector-icons/FontAwesome6";
import { getAuth } from "@react-native-firebase/auth";
import LinearGradient from "react-native-linear-gradient";
import styles from "../styles/Home_Connect";
import { Button } from "react-native-paper";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface User {
    image: string;
    name: string;
    email: string;
    phone: string;
    Uid: string;
}


const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
    const [users, setUsers] = useState<User[]>([]);
  const auth = getAuth();
  const currentUid = auth.currentUser?.uid;
    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchDataOnce();
            if (data) {
                const userArray: User[] = Object.keys(data).map(key => ({
                    image: data[key].image,
                    name: data[key].name,
                    email: data[key].email,
                    phone: data[key].phone,
                    Uid: data[key].uid
                }));
                setUsers(userArray);
            }
        };
        getUsers();
    }, []);

    return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#6C63FF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ChatBox</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Icon name="user-circle" size={34} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.Uid?.toString() || index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('ChatScreen', { user: item })}
          >
            <View style={styles.cardContent}>
              <Image
                source={
                  item.image
                    ? { uri: `data:image/jpeg;base64,${item.image}` }
                    : require("../assets/icon/Profile.jpg")
                }
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
              <TouchableOpacity style={styles.chatButton}>
                <Icon name="message" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("ConnectScreen")}
      >
        <Icon name="user-plus" size={28} color="#fff" />
      </TouchableOpacity>
      {/* <Button children="Logout" onPress={() =>  navigation.navigate("ProfileScreen")} /> */}
    </SafeAreaView>
  );
};


export default HomeScreen;

