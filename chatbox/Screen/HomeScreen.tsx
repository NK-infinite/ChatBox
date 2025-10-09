import React from "react";
import { View , Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigations/StackNavigations';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
const HomeScreen= ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
 return(
    <View>
    
    </View>
)

}

export default HomeScreen;