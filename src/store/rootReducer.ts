import { combineReducers } from 'redux';
import cryptoReducer, { CryptoSlice } from '../modules/crypto/action/cryptoReducer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createRootReducer = () => {
  return combineReducers({
    crypto: persistReducer({ key: 'crypto', storage: AsyncStorage }, cryptoReducer),
  });
};

export type ReduxSlices = {
  crypto: CryptoSlice;
};
