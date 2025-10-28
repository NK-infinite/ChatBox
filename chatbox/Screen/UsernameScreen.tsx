import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { getDatabase, ref, get, update, set } from "@react-native-firebase/database";


import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";



const UsernameScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const db = getDatabase();
  const auth = getAuth();
  const user = auth?.currentUser;

  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const allowedRegex = /^[a-zA-Z0-9_@]{5,32}$/;


   const handleSaveUsername = async () => {
    if (!user) return;

    let cleanUsername = username
      .trim()
      .toLowerCase();

    if (!allowedRegex.test(cleanUsername)) {
      Alert.alert(
        "Invalid Username",
        "Allowed: a-z, 0-9, _. Length: 5-32. No spaces or special characters."
      );
      return;
    }

    try {
      setLoading(true);

      const usernameRef = ref(db, `usernames/${cleanUsername}`);
      const snapshot = await get(usernameRef);

      if (snapshot.exists()) {
        Alert.alert("Taken", "Username already in use");
        return;
      }

      await update(ref(db, `users/${user.uid}`), {
        username: cleanUsername,
      });

      // ✅ Save owner UID under the username (correct)
      await set(usernameRef, user.uid);

      Alert.alert("Success", "Username updated!");
      navigation.replace("ProfileScreen");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

    
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
        Create Username
      </Text>

      <TextInput
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
        placeholder="Pick a username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            marginTop: 20,
            padding: 15,
            borderRadius: 8,
          }}
          onPress={handleSaveUsername}
        >
          <Text style={{ color: "#fff",fontSize:17, textAlign: "center", fontWeight: "bold" }}>
            Save
          </Text>
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" ,fontSize: 19 }}>
          USERNAME RULES:
        </Text>
        <Text >
          • Must start with a letter (A–Z)
        </Text>
        <Text>
          • 5–32 characters long
        </Text>
        <Text>
          • Only letters, numbers, and underscores
        </Text>
        <Text>
          • No spaces or emojis
        </Text>
        <Text>
          • @ is allowed only at the start (optional)
        </Text>

      </View>
    </View>
    </SafeAreaView>
  );
};

export default UsernameScreen;


