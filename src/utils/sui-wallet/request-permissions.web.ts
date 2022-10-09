const w = window as any;

export const suiWalletRequestPermissions = async () => {
  return await w.suiWallet?.requestPermissions();
};
