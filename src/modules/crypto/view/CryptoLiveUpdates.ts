import React, { FC, useEffect } from 'react';
import { Cryptocurrency } from '../../../models/Cryptocurrency';
import cryptoDispatcher from '../action/cryptoDispatcher';

interface Props {
  withSearch: boolean;
  updatableCurrencies?: Cryptocurrency[];
}

const CryptoLiveUpdates: FC<Props> = ({ withSearch, updatableCurrencies }) => {
  useEffect(() => {
    if (updatableCurrencies) {
      const interval = setInterval(() => {
        cryptoDispatcher.fetchSpecific(updatableCurrencies, withSearch);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [withSearch, updatableCurrencies]);

  return null;
};

export default React.memo(CryptoLiveUpdates);
