import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FinalScreen from '../modules/final';
import ProgressScreen from '../modules/progress';

import MainTabNavigator from './MainTabNavigator';

import { colors, fonts } from '../styles';

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    ProgressScreen: {
      screen: ProgressScreen,
      navigationOptions: {
        title: 'SwypeCov',
        headerLeft: () => null,
      },
    },
    FinalScreen: {
      screen: FinalScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: colors.primary,
        fontWeight: 'bold',
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#ffffff',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
