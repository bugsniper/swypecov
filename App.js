import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from "react-native-screens";

import { colors } from './src/styles';
import { store, persistor } from './src/core/store';

import AppView from './src/AppViewContainer';
import SplashScreen from 'react-native-splash-screen'
enableScreens();
SplashScreen.hide();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        }
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
