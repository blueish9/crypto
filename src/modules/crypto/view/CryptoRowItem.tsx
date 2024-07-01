import React, { FC } from 'react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Cryptocurrency } from '../../../models/Cryptocurrency';
import { colors } from '../../../styles/colors';

interface Props {
  currency: Cryptocurrency;
}

const CryptoRowItem: FC<Props> = ({ currency }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 16, marginBottom: 5 }}>{currency.symbol}</Text>
        <Text style={{ color: colors.subtext }}>{currency.name}</Text>
      </View>
      {currency.quote.USD ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              color: currency.quote.USD.percent_change_1h > 0 ? colors.green : colors.red,
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            {currency.quote.USD.percent_change_1h.toFixed(2) + '%'}
          </Text>
          <Text style={{ color: colors.text }}>{'$' + currency.quote.USD.price.toFixed(2)}</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
});

export default React.memo(CryptoRowItem);
