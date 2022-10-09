import {gamePackageId} from '../../../modules/game/package-id';
import {suiWalletGet} from './get';

type Props = {
  function: string;
  arguments?: string[];
};

export const suiWalletExecuteMoveCall = (props: Props) => {
  const wallet = suiWalletGet();
  if (!wallet) {
    return Promise.reject('wallet not available');
  }

  return wallet.executeMoveCall({
    packageObjectId: gamePackageId,
    module: 'main',
    function: props.function,
    typeArguments: [],
    arguments: props.arguments || [],
    gasBudget: 1e4,
  });
};
