import React, { Dispatch, FC, SetStateAction } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const CryptoSearchBar: FC<Props> = ({ keyword, setKeyword }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput value={keyword} onChangeText={setKeyword} style={{ flex: 1, marginLeft: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default React.memo(CryptoSearchBar);
