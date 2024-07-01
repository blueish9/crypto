import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import cryptoDispatcher from '../action/cryptoDispatcher';
import { useSelector } from 'react-redux';
import { selectCrypto } from '../action/cryptoSelector';
import { Cryptocurrency } from '../../../models/Cryptocurrency';
import CryptoRowItem from './CryptoRowItem';
import CryptoSearchBar from './CryptoSearchBar';
import CryptoLiveUpdates from './CryptoLiveUpdates';
import { colors } from '../../../styles/colors';

const CryptoListScreen = () => {
  const [offset, setOffset] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const { cmcMaps, currencies } = useSelector(selectCrypto);
  const viewableCurrencies = useRef<Record<string, Cryptocurrency>>({});

  useEffect(() => {
    // can use time to invalidate cache and fetch again
    // for now, we only check existence for the sake of simplicity
    if (cmcMaps.length < 1) {
      cryptoDispatcher.fetchMap();
    }
  }, [cmcMaps]);

  useEffect(() => {
    if (!keyword) {
      cryptoDispatcher.fetchMany({ offset: 1, refresh: true });
    }
  }, [keyword]);

  const renderCryptoItem: ListRenderItem<Cryptocurrency> = useCallback(({ item }) => {
    return <CryptoRowItem currency={item} />;
  }, []);

  const specificCurrencies = useMemo(() => {
    if (keyword.length < 1) {
      return currencies;
    }

    const searchText = keyword.toLowerCase();

    const prefetchedCurrencies = currencies.filter(
      (currency) =>
        currency.symbol.toLowerCase().includes(searchText) ||
        currency.name.toLowerCase().includes(searchText),
    );

    const missingCurrencies = cmcMaps
      .filter(
        (currency) =>
          currency.symbol.toLowerCase().startsWith(searchText) ||
          currency.name.toLowerCase().startsWith(searchText),
      )
      .filter((currency) => {
        const isPrefetched = prefetchedCurrencies.some(
          (prefetchedCurrency) => prefetchedCurrency.id === currency.id,
        );
        return !isPrefetched;
      })
      .map((currency) => ({ ...currency, quote: currency.quote || {} } as Cryptocurrency));

    return [...prefetchedCurrencies, ...missingCurrencies];
  }, [cmcMaps, currencies, keyword]);

  if (currencies.length < 1) {
    return <ActivityIndicator size={'large'} />;
  }

  const refreshList = async () => {
    if (refresh || keyword.length > 0) {
      return;
    }
    setRefresh(true);
    const nextOffset = 1;
    const success = await cryptoDispatcher
      .fetchMany({ offset: nextOffset, refresh: true })
      .waitResult();
    if (success) {
      setOffset(nextOffset);
    }
    setRefresh(false);
  };

  const changeViewableCurrencies: FlatListProps<Cryptocurrency>['onViewableItemsChanged'] = ({
    viewableItems,
    changed,
  }) => {
    viewableItems.forEach(({ item, isViewable, key }) => {
      if (isViewable) {
        viewableCurrencies.current[key] = item;
      }
    });
    changed.forEach(({ isViewable, key }) => {
      if (!isViewable) {
        delete viewableCurrencies.current[key];
      }
    });
  };

  return (
    <View style={styles.container}>
      <CryptoLiveUpdates
        withSearch={keyword.length > 0}
        updatableCurrencies={
          keyword.length > 0 ? specificCurrencies : Object.values(viewableCurrencies.current)
        }
      />

      <CryptoSearchBar keyword={keyword} setKeyword={setKeyword} />

      {specificCurrencies.length < 1 && (
        <Text style={styles.empty}>
          {`Coin "${keyword}" doesn't exist\nTry another name or symbol`}
        </Text>
      )}

      <FlatList
        data={specificCurrencies}
        keyExtractor={keyExtractor}
        renderItem={renderCryptoItem}
        onEndReachedThreshold={0.5}
        onEndReached={() =>
          keyword.length < 1 &&
          loadMoreCurrencies({ loading, setLoading, offset: offset + currencies.length, setOffset })
        }
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshList} tintColor={colors.green} />
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={changeViewableCurrencies}
      />
    </View>
  );
};

const viewabilityConfig = {
  minimumViewTime: 500,
  viewAreaCoveragePercentThreshold: 0,
};

const loadMoreCurrencies = throttle(async ({ loading, setLoading, offset, setOffset }) => {
  if (loading) {
    return;
  }
  setLoading(true);
  const success = await cryptoDispatcher.fetchMany({ offset }).waitResult();
  if (success) {
    setOffset(offset);
  }
  setLoading(false);
}, 3000);

const keyExtractor = (currency: Cryptocurrency) => '' + currency.id;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { color: colors.text, flex: 1, textAlign: 'center', fontWeight: 'bold' },
});

export default React.memo(CryptoListScreen);
