import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { configRedux } from './src/store/Redux';
import CryptoListScreen from './src/modules/crypto/view/CryptoListScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles/colors';

export default function App() {
  const [{ store, persistor }] = useState(() => configRedux());
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar style="inverted" />
          <CryptoListScreen />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
