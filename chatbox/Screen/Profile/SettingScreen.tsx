import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { logout, deleteAccount } from '../../Firebase/logout_delete_Account';
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteAccountModal from '../../Components/deleteAccountmodal';
const SettingsScreen = ({ navigation }: any) => {
  const [showModal, setShowModal] = React.useState(false);
   const handelDelete = ({navigation}:any) => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => setShowModal(true),
        },
      ]
    );
   }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content"  backgroundColor="#888" />
<View style={styles.header}>
<TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={25} color={'#fff'} />
              </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
</View>
<View style={styles.container}>

      <View style={styles.section}>
        
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("EditProfileScreen")}>
          <Icon name="user-circle" size={24} color="#555" />
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => logout({navigation})}>
          <Icon name="right-from-bracket" size={24} color="#E67E22" />
          <Text style={[styles.itemText, { color: '#E67E22' }]}>Logout</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.dangerZone}>
        
        <TouchableOpacity style={styles.item} onPress={() => handelDelete({navigation} )}>
          <Icon name="trash" size={24} color="#B00020" />
          <Text style={[styles.itemText, { color: '#B00020' }]}>Delete Account</Text>
        </TouchableOpacity>

 <DeleteAccountModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        navigation={navigation}
      />
      </View>
        <View style={ {flexDirection:'column', marginTop:40} } >
                    <TouchableOpacity
                        style={styles.termsButton}
                        onPress={() =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'terms' }],
    })
  }
>
                            <Text style={styles.termsLink}>
                                Terms of Service
                                <Text> and </Text>
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                                </Text>
                    </TouchableOpacity>
                </View>
          
</View>

    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
     paddingHorizontal: 20,

flex:1,
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
        letterSpacing: 1,
    },
  section: {
    paddingVertical: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '600',
    color: '#333',
  },
  dangerZone: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
   termsText: {
   // fontSize: 12,
    textAlign: 'center',
   // flex: 1,
  
  },
  termsLink: {
    color: '#007AFF',
  //  fontWeight: '500',
  textDecorationLine: 'underline',
  },
  
   termsButton: {
//         justifyContent: 'center',
       alignItems: 'center',


// textAlign:'center',
//         paddingVertical: 12,
     },
});
