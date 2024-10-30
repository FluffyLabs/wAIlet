import { Teleport } from "@/TransactionContainer/Teleport";
import { TransactionType, useTransaction } from "@/context/transactionCtx";

export const TransactionContainer: React.FC = () => {
  const {
    state: { type },
  } = useTransaction();

  switch (type) {
    case TransactionType.Teleport:
      return <Teleport />;
    default:
      return null;
  }
};
