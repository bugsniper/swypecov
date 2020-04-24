import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import colors from "../styles/colors";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
const AddressAutoComplete = ({locationTxt, isValid, loading}) => {
  return (
    <View style={{height: 60, borderWidth: 1, borderColor: colors.primary, borderRadius: 5, padding: 5}}>
      <Text style={{fontSize: 10}}>address</Text>
      <View style={{marginTop: 5, flexDirection: 'column'}}>
        <FontAwesomeIcon name="map-marker" size={20} color={colors.primary} style={{position: 'absolute'}}/>
        <Text numberOfLines={1} style={{fontSize: 15, paddingHorizontal: 20}}>{locationTxt}</Text>
        {!!isValid && !loading && <AntDesignIcon name="checkcircle" size={20} color={colors.green} style={{position: 'absolute', right: 5}}/>}
        {!!loading && <ActivityIndicator color={colors.primary} style={{position: 'absolute', right: 5}}/>}
      </View>
    </View>
  );
};

export default AddressAutoComplete;
