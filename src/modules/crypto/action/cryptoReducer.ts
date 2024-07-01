import cryptoDispatcher from './cryptoDispatcher';
import { createReducer } from 'redux-dispatcher';
import { CMCMap, Cryptocurrency } from '../../../models/Cryptocurrency';

const initialState = {
  currencies: [] as Cryptocurrency[],
  cmcMaps: [] as CMCMap[],
};

export type CryptoSlice = typeof initialState & {
  cmcMap?: CMCMap;
};

const mapActionToReducer = () => ({
  [[cryptoDispatcher.saveMap, cryptoDispatcher.saveList]]: (_, payload) => payload,

  [cryptoDispatcher.updateSpecific]: (state: CryptoSlice, { latestQuotes }, { set }) => {
    let newState = state;
    for (const key in latestQuotes) {
      const { id, quote } = latestQuotes[key];

      // remove this log to see live updates
      //console.log('latestQuotes', id, quote);

      const currencyIndex = newState.currencies.findIndex((currency) => currency.id === id);
      if (currencyIndex >= 0) {
        newState = set(`currencies.${currencyIndex}.quote`, quote);
      }
    }
    return newState;
  },
});

export default createReducer(initialState, mapActionToReducer);
