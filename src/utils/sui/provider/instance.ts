import {JsonRpcProvider} from '../../../sui-sdk';

export const suiProviderInstance = new JsonRpcProvider(
  'https://gateway.devnet.sui.io:443',
);
