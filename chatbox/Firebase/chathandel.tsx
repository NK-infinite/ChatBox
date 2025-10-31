import { getDatabase, ref } from "@react-native-firebase/database";
import { databaseURL} from "../../firebaseConfig";
import { getAuth } from "@react-native-firebase/auth";
import { remove } from "@react-native-firebase/database";

const auth = getAuth();
const currentUser = auth.currentUser;
const chatId = currentUser?.uid;

export const deleteChat = async ({ messageId, otherUserId }: { messageId: string; otherUserId: string; }) => {
  
  
    try {
    
    const db = getDatabase();
    const currentUser = getAuth().currentUser;

    if (!currentUser) return;

    const currentUid = currentUser.uid;

    const senderRef = ref(db, `users/${currentUid}/messages/${otherUserId}/${messageId}`);
    const receiverRef = ref(db, `users/${otherUserId}/messages/${currentUid}/${messageId}`);
    console.log( "currentUID:" , currentUid);
    console.log( "otherUID:" , otherUserId);
    console.log("massgeID:" , messageId);
    
    
    await remove(senderRef);
    await remove(receiverRef);



  } catch (error) {
    console.log("Delete Chat Error →", error);
  }
};

export const deleteForMe = async ({ messageId, otherUserId }: { messageId: string; otherUserId: string; }) => {
  try {
    console.log("deleteForMe:",messageId, otherUserId);
    
    const db = getDatabase();
    const currentUser = getAuth().currentUser;

    if (!currentUser) return;
    const currentUid = currentUser.uid;

    const messageRef = ref(db, `users/${currentUid}/messages/${otherUserId}/${messageId}`);

    await remove(messageRef);

  } catch (e) {
    console.log("DeleteForMe Error →", e);
  }
};
