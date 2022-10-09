import useSWR from 'swr';
import {suiWalletGetAccounts} from './get-accounts';

export const useSuiWalletAccounts = (shouldFetch: boolean) => {
  const {data, error} = useSWR(
    shouldFetch ? 'yes' : null,
    suiWalletGetAccounts,
    {},
  );

  return data;
};
