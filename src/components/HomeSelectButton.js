import React from 'react';
import {Image, View} from 'react-native';
import {Card, CardItem, Content, Text} from 'native-base';
import colors from "../styles/colors";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
const HomeSelectButton = ({selectedHomeType}) => {
  return (
    <Card style={{borderRadius: 10}}>
      <CardItem style={{borderRadius: 10, height: 70, backgroundColor: selectedHomeType > 0? colors.primary: colors.white}}>
        <Image style={{resizeMode: 'contain', width: 50, height: 30}} source={require('../../assets/images/icons/home-icon.png')}/>
        <Text style={{fontSize: 29, paddingHorizontal: 5, fontWeight: 'bold', color: selectedHomeType > 0? colors.textInputColor: colors.black}}>home</Text>
        {selectedHomeType > 0 && <AntDesignIcon name="checksquare" size={25} style={{paddingStart: 10, color: colors.green}}/>}
        {!selectedHomeType > 0 && <FontistoIcon name="checkbox-passive" size={25} style={{paddingStart: 10, color: colors.black}}/>}
        <View style={{width: 50,position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 7, justifyContent: 'center', alignSelf: 'center', color: selectedHomeType > 0? colors.textInputColor: colors.darkerGray}}>SELECT MORE</Text>
          <AntDesignIcon name="caretdown" size={20} color={selectedHomeType > 0? colors.textInputColor: colors.darkerGray}/>
        </View>
      </CardItem>
    </Card>
  );
};

export default HomeSelectButton;
