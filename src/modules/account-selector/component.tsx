import {useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {useSuiWalletAccounts} from '../../utils/sui-wallet/accounts.hook';
import {suiWalletGet} from '../../utils/sui-wallet/get';
import {suiWalletHasPermissions} from '../../utils/sui-wallet/has-permissions';
import {suiWalletRequestPermissions} from '../../utils/sui-wallet/request-permissions';

type Props = {
  onAccountChanged: (accountId: string | void) => void;
};

export const AccountSelectorComponent = ({onAccountChanged}: Props) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [suiWalletWaitingCounter, setSuiWalletWaitingCounter] = useState(0);
  const accounts = useSuiWalletAccounts(hasPermissions);
  const suiWalletIsUnavailable = !suiWalletGet();

  useEffect(() => {
    if (suiWalletIsUnavailable) {
      return;
    }
    suiWalletHasPermissions().then(setHasPermissions);
  }, [suiWalletIsUnavailable]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (suiWalletIsUnavailable) {
      timeoutId = setTimeout(
        () => setSuiWalletWaitingCounter(suiWalletWaitingCounter + 1),
        1000,
      );
    }
    return () => clearInterval(timeoutId);
  }, [suiWalletIsUnavailable, suiWalletWaitingCounter]);

  const accountId = accounts?.[0];

  useEffect(() => {
    onAccountChanged(accountId);
  }, [onAccountChanged, accountId]);

  if (suiWalletIsUnavailable) {
    return <Text>Can't work without Sui wallet</Text>;
  }

  if (!hasPermissions) {
    return (
      <Button
        title="Connect wallet"
        onPress={async () => {
          setHasPermissions(await suiWalletRequestPermissions());
        }}
      />
    );
  }

  if (!accounts) {
    return <Text>Loading accounts</Text>;
  }

  return <Text>Logged in: {accountId}</Text>;
};
