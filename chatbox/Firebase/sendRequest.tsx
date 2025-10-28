import { update, ref, get } from '@react-native-firebase/database';

import { getDatabase } from '@react-native-firebase/database';

const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';


const db = getDatabase(undefined, databaseURL);

export const sendFriendRequest = async (fromUid: string, toUid: string) => {
    const db = getDatabase(undefined, databaseURL);

    // 1. Check if already connected
    const toUserSnap = await get(ref(db, `users/${toUid}`));
    if (toUserSnap.exists()) {
        const toUser = toUserSnap.val();
        // Already connected
        if (toUser.connections && toUser.connections[fromUid]) {
            throw new Error('Already connected!');
        }
        // Already has incoming request
        if (toUser.friendRequests && toUser.friendRequests[fromUid]) {
            throw new Error('Request already sent!');
        }
    }

    // 2. Check if already requested
    const fromUserSnap = await get(ref(db, `users/${fromUid}`));
    if (fromUserSnap.exists()) {
        const fromUser = fromUserSnap.val();
        // Already requested
        if (fromUser.friendRequests && fromUser.friendRequests[toUid]) {
            throw new Error('Request already sent!');
        }
    }

    // Send request
    await update(ref(db, `users/${toUid}/friendRequests`), {
        [fromUid]: true
    });
};
