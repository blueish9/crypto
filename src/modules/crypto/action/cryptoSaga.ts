import { all, select, getContext, takeLeading } from 'redux-saga/effects';
import cryptoDispatcher from './cryptoDispatcher';
import { Axios, AxiosResponse } from 'axios';
import { selectCrypto } from './cryptoSelector';
import { Cryptocurrency } from '../../../models/Cryptocurrency';

export function* cryptoWatcher() {
  yield all([
    takeLeading(cryptoDispatcher.fetchMap, fetchMap),
    takeLeading(cryptoDispatcher.fetchMany, fetchMany),
    takeLeading(cryptoDispatcher.fetchSpecific, fetchSpecific),
  ]);
}

function* fetchMap() {
  const client: Axios = yield getContext('client');
  const response: AxiosResponse = yield client.get('v1/cryptocurrency/map', {
    params: {
      limit: 5000, // 1 credit per request no matter query size (according to CMC Documentation)
    },
  });
  if (!response) {
    return;
  }
  if (response.status === 200 && response.data) {
    cryptoDispatcher.saveMap(response.data.data);
  }
}

function* fetchMany({
  offset,
  limit,
  refresh,
  dispatchResult,
}: ReturnType<typeof cryptoDispatcher.fetchMany>) {
  const client: Axios = yield getContext('client');
  const response: AxiosResponse = yield client.get('v1/cryptocurrency/listings/latest', {
    params: {
      start: offset,
      limit,
    },
  });
  if (!response) {
    return dispatchResult(false);
  }
  if (response.status === 200 && response.data) {
    const { data } = response.data;
    if (refresh) {
      cryptoDispatcher.saveList(data);
    } else {
      const { currencies } = yield select(selectCrypto);
      cryptoDispatcher.saveList([...currencies, ...data]);
    }
    dispatchResult(true);
    return;
  }
  dispatchResult(false);
}

function* fetchSpecific({
  currencies,
  withSearch,
}: ReturnType<typeof cryptoDispatcher.fetchSpecific>) {
  const client: Axios = yield getContext('client');
  const response: AxiosResponse = yield client.get('v2/cryptocurrency/quotes/latest', {
    params: {
      id: currencies.map((currency) => currency.id).join(','),
    },
  });
  if (!response) {
    return;
  }
  if (response.status === 200 && response.data) {
    const { data } = response.data;
    withSearch
      ? cryptoDispatcher.saveList(Object.values(data) as Cryptocurrency[])
      : cryptoDispatcher.updateSpecific(data);
  }
}
