const w = window as any;

export const suiWalletHasPermissions = async () => {
  return await w.suiWallet?.hasPermissions();
};
