import { View,Text, TouchableHighlight } from "react-native"
import TouchableOpacity from "react-native"
import React from "react"
import styles from "../styles/Login_Singup"
import  Icon  from "react-native-vector-icons/FontAwesome6"
import googleAuth from "../Firebase/googleAuth"
import { useModal } from "../Components/ModalComponet"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../Navigations/StackNavigations"

 type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Social =({ navigation }: { navigation: LoginScreenNavigationProp }) =>{
 const { showModal } = useModal();
      const Googlelogin = async () => {

    try {
      const user = await googleAuth();
      if (user) {
        navigation.navigate('HomeScreen');
        showModal('Google Login Success');
      } else {
        showModal('Google Login Failed');
      }
      
    } catch (error) {
      console.log('Google Login Error:', error);
    }
  }
    return(
        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or continue with</Text>
          <View style={styles.socialButtons}>
                <TouchableHighlight
                    onPress={Googlelogin}
                    style={styles.socialButton}>
                    <Icon name="google" size={40} color="#ec2816ff" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.socialButton}>
                    <Icon name="facebook-f" size={40} color="#4267B2" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.socialButton}>
                    <Icon name="apple" size={40} color="#ec2816ff" />
                </TouchableHighlight>
            </View>
        </View>
    )
}


export default Social;
