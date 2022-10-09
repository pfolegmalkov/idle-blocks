import './supress-warnings';
import {RootComponent} from './src/modules/root/component';

// const provider = new JsonRpcProvider('https://gateway.devnet.sui.io:443');
/*
async function x () {
  const keypair = new Ed25519Keypair();
  const signer = new RawSigner(
    keypair,
    new JsonRpcProvider('https://gateway.devnet.sui.io:443')
  );
  const moveCallTxn = await signer.executeMoveCall({
    packageObjectId: '0x2',
    module: 'devnet_nft',
    function: 'mint',
    typeArguments: [],
    arguments: [
      'Example NFT',
      'An NFT created by the wallet Command Line Tool',
      'ipfs://bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty',
    ],
    gasBudget: 10000,
  });

  console.log('moveCallTxn', moveCallTxn)
}

x(); */

export default function App() {
  return <RootComponent />;
}
