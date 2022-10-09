import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AccountSelectorComponent} from '../account-selector/component';
import {GameComponent} from '../game/component';

export const RootComponent = () => {
  const [accountId, setAccountId] = useState<string | void>();
  return (
    <View style={styles.container}>
      <AccountSelectorComponent onAccountChanged={setAccountId} />
      {accountId && <GameComponent accountId={accountId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
