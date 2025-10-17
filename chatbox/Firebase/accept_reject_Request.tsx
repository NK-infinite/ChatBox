import { update, ref } from '@react-native-firebase/database';
import { getDatabase } from '@react-native-firebase/database';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';

const db = getDatabase(undefined, databaseURL);

export const acceptFriendRequest = async (currentUid: string, senderUid: string) => {
    const updates: Record<string, any> = {};
    // remove request
    updates[`users/${currentUid}/friendRequests/${senderUid}`] = null;
    // add connections both sides
    updates[`users/${currentUid}/connections/${senderUid}`] = true;
    updates[`users/${senderUid}/connections/${currentUid}`] = true;

    await update(ref(db), updates);
};

export const rejectFriendRequest = async (currentUid: string, senderUid: string) => {
    const updates: Record<string, any> = {};
    // remove request
    updates[`users/${currentUid}/friendRequests/${senderUid}`] = null;
    // remove connections if exist
    updates[`users/${currentUid}/connections/${senderUid}`] = null;
    updates[`users/${senderUid}/connections/${currentUid}`] = null;

    await update(ref(db), updates);
};
