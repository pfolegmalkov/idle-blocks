const w = window as any;

export const suiWalletGetAccounts = async (): Promise<string[]> => {
  const hasPermissions = await w.suiWallet?.hasPermissions();
  if (!hasPermissions) {
    return [];
  }

  return await w.suiWallet?.getAccounts();
};
