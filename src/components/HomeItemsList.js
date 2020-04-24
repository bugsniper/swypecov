import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import { List, ListItem, Left, Body, Right, Text } from 'native-base';
import colors from "../styles/colors";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
const carIcon = require('../../assets/images/icons/car-icon.png');
const floodIcon = require('../../assets/images/icons/flood-icon.png');
const lifeIcon = require('../../assets/images/icons/life-icon.png');
const umbrellaIcon = require('../../assets/images/icons/umbrella-icon.png');
const condoIcon = require('../../assets/images/icons/condo-icon.png');

const typesList = [
  {key: 'auto', value: 'Auto', icon: carIcon},
  {key: 'flood', value: 'Flood', icon: floodIcon},
  {key: 'life', value: 'Life', icon: lifeIcon},
  {key: 'umbrella', value: 'Umbrella', icon: umbrellaIcon},
  {key: 'condo', value: 'Condo', icon: condoIcon}
];

const HomeItemsList = ({selectedHomeTypeList, selectedHomeType, onSelectHomeType}) => {
  useEffect(() => {
  }, [selectedHomeType]);

  const isExist = (data) => {
    return (selectedHomeTypeList.indexOf(data) !== -1);
  };
  return (
    <View style={{height: 225}}>
      <List
        dataArray={typesList}
        keyExtractor={item => item.key}
        renderRow={data => <ListItem
          // style={{backgroundColor: isExist(data.key)? colors.primary: colors.white}}
          icon
          onPress={() => onSelectHomeType(data.key)}
        >
            <Left style={{width: 50}}><Image source={data.icon} /></Left>
            <Body><Text>{data.value}</Text></Body>
            <Right>
              {isExist(data.key) && <AntDesignIcon name="checkcircle" size={25} color={colors.green} style={{paddingStart: 10}}/>}
            </Right>
          </ListItem>
        }
      />
    </View>
  );
};

export default HomeItemsList;
