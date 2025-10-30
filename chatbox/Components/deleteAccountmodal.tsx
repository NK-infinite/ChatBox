import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Alert, Touchable, TouchableOpacity } from 'react-native';
import { deleteAccount } from '../Firebase/logout_delete_Account';
import { handleForgotPassword } from '../Firebase/forgotpassword';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function DeleteAccountModal({ visible, onClose, navigation }: any) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const handleDelete = async () => {
    if (!password) return Alert.alert('Error', 'Enter your password');
    setLoading(true);
    await deleteAccount(password, navigation);
    setLoading(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
        <View style={{ width: '85%',height:"auto", backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 20 }}>
        
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 20 }}>Confirm Deletion</Text>


          <View  style={{
                borderWidth: 1,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                borderColor: '#000000ff',
                paddingHorizontal:10,
                paddingVertical: 4,
                borderRadius: 10,
                marginBottom: 10,
            }}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#000000ff"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
           style={{ flex: 1, padding: 10 }}
            />
            <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                           // style={styles.eyeIcon}
                        >
                            <Icon
                                name={showPassword ? 'eye-slash' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                            </View>

          <TouchableOpacity 
           onPress={()=>
            Alert.alert(
                'Password Reset link Sent',
                'We sent a password reset link to your email.',
                [
                    {
                        text: 'cancel',
                        onPress: () => console.log('Cancel Pressed'),
                    },
                    {
                        text: 'sent',
                        onPress: () => handleForgotPassword(),
                    },
                ]
            )
           }
           style={{ marginTop: 0, alignSelf: 'flex-end' }}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 , marginBottom: 30  }}>
          <TouchableOpacity
           onPress={()=>onClose()}
           >
              <Text style={{ color: 'blue',fontSize: 20  }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={handleDelete}>
              <Text style={{ color: 'red', fontSize: 20 }}>Delete Account</Text>
          </TouchableOpacity>
          </View>
          {/* <Button title={loading ? 'Deleting...' : 'Delete Account'} onPress={handleDelete} disabled={loading} />
          <Button title="Cancel" onPress={onClose} color="gray" /> */}
        </View>
      </View>
    </Modal>
  );
}