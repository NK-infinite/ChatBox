import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { TextInput } from 'react-native-paper';
import { getDatabase, ref, onValue, push, get, set } from '@react-native-firebase/database';
import { getAuth } from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ScrollView } from 'react-native';
import { deleteChat, deleteForMe } from '../Firebase/chathandel';
import { Clipboard } from 'react-native';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}



const ChatScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const { chatId } = route?.params;
  const phone = route?.params?.phone;
  console.log(chatId, phone);

  const auth = getAuth();
  const currentUser: FirebaseAuthTypes.User | null = auth.currentUser;

  const [messages, setMessages] = useState<Message[]>([]); // Type defined
  const [text, setText] = useState('');
  const [otherProfile, setOtherProfile] = useState<any | null>(null);


  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      try {
        const db = getDatabase(
          undefined,
          "https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app"
        );

        const userSnap = await get(ref(db, `users/${chatId}`));

        if (userSnap.exists()) {
          setOtherProfile(userSnap.val());
        } else {
          console.log("Other user not found.");
          setOtherProfile(null);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
        setOtherProfile(null);
      }
    };

    fetchOtherUserProfile();
  }, [chatId]);




  useEffect(() => {
    const db = getDatabase(
      undefined,
      "https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app"
    );
    const messagesRef = ref(db, `users/${currentUser?.uid}/messages/${chatId}`);

    const unsubscribe = onValue(messagesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const msgs: Message[] = Object.keys(data).map(key => ({
          id: key,
          sender: data[key].sender,
          text: data[key].text,
          timestamp: data[key].timestamp,
        }));
        console.log('Messages received:', data);
        msgs.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(msgs.reverse());
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = () => {
    if (!currentUser || text.trim() === "") return;

    const db = getDatabase(
        undefined,
        "https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app"
    );

    const senderId = currentUser.uid;
    const receiverId = chatId;
    
    // --- 1. Get a unique key for the message ---
    // We will use this key for both the sender and the receiver's node.
    const senderRef = ref(db, `users/${senderId}/messages/${receiverId}`);
    const newMessageRef = push(senderRef); // This generates a unique key
    const messageKey = newMessageRef.key; // Get the key!

    if (!messageKey) return; // Should not happen

    const messageData = {
        sender: senderId,
        senderEmail: currentUser.email || "unknown",
        text: text.trim(),
        timestamp: Date.now(),
    };

    // --- 2. Save message to sender's node using the common key ---
    set(newMessageRef, messageData); 

    // --- 3. Save message to receiver's node using the *same common key* ---
    const receiverRef = ref(db, `users/${receiverId}/messages/${senderId}/${messageKey}`);
    set(receiverRef, messageData); 
    
    console.log("Message sent with key:", messageKey);
    setText("");
};
  const handelChat = (id:any)=>{
  const currentUid = currentUser?.uid;
  const isMyMessage = id.sender === currentUid;
  if (!currentUid) return;

    if (isMyMessage) {
       Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
 
        {
  text: "Delete for Me",
  onPress: () => deleteForMe({ messageId: id.id, otherUserId: chatId, })
},
   
        {
          text: "Delete for everyone",
          onPress: () => deleteChat({ messageId: id.id, otherUserId: chatId, }),
          style: "destructive",
        }
      ],
      { cancelable: false }
    );
  }else{

    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        
        {
          text: "Delete for Me",
          onPress: () => deleteForMe({ messageId: id.id, otherUserId: chatId, })
        },
        
     
      ],
      { cancelable: false }
    );
  }
}

  const renderItem = ({ item }: { item: any }) => (
    <View
      key={item.id}
      style={[
        styles.messageContainer,
        {
          alignSelf: item.sender === currentUser?.uid ? 'flex-end' : 'flex-start',
          backgroundColor: item.sender === currentUser?.uid ? '#6C63FF' : '#e0e0e0'
        }
      ]}
    >
      <TouchableOpacity 
    onLongPress={()=> handelChat(item)}>

      <Text style={{ color: item.sender === currentUser?.uid ? '#fff' : '#000' }}>{item.text}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
        </TouchableOpacity>
    </View>
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
     
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={25} color={'#fff'} />
              </TouchableOpacity>
              {otherProfile?.image ? (
                <Image source={{ uri: `data:image/jpeg;base64, ${otherProfile.image}` }} style={styles.userImage} />
              ) : (
                <View style={styles.placeholderImage}></View>
              )}
            </View>
            <Text style={styles.title}>{otherProfile?.name || "User"}</Text>
          </View>

          {/* Chat Content */}

          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            inverted
            keyboardShouldPersistTaps='never'
            contentContainerStyle={{ padding: 10, }} // add bottom space
          />

          {/* Bottom Input Bar */}
          <View style={styles.bottom}>
            <Icon name="plus" size={30} color="#6C63FF" style={{ marginRight: 10 }} />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Type a message"
                style={styles.textInput}
                value={text}
                onChangeText={setText}
              />
            </View>
            <TouchableOpacity onPress={sendMessage}>
              <Icon name="paper-plane" size={30} color="#6C63FF" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
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
    letterSpacing: 1
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
        borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.26,
    shadowRadius: 3,
    elevation: 7,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    bottom: 0
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  timestamp:
  {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 2
  }
});