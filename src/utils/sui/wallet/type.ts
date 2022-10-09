type MoveCallReturnType = {
  a: 1;
};

type ExecuteMoveCallProps = {
  packageObjectId: string;
  module: string;
  function: string;
  typeArguments: string[];
  arguments: string[];
  gasBudget: number;
};

export type SuiWalletType = {
  executeMoveCall: (props: ExecuteMoveCallProps) => Promise<MoveCallReturnType>;
};
