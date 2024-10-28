import { Teleport } from "@/Teleport";
import { type TeleporterState, teleportReducer } from "@/Teleport/Teleport";
import type { AssetId, ChainId } from "@/api";
import { useChat } from "./chatCtx";
import { useEffect, useState } from "react";

export enum TransactionType {
  Teleport = "teleport",
}

type ChatTransaction = {
  kind: TransactionType.Teleport;
  source: ChainId;
  destination: ChainId;
  asset: AssetId;
  amount: number;
};

type InitialState = TeleporterState;

export const TransactionProvider: React.FC = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [initialState, setInitialState] = useState<InitialState>();
  const { data, setData } = useChat();

  useEffect(() => {
    if (data?.[0]) {
      const [chatTransaction] = data as [ChatTransaction];

      setTransactionType(chatTransaction.kind);

      if (chatTransaction.kind === TransactionType.Teleport) {
        let initialState = teleportReducer({} as TeleporterState, {
          type: "from",
          value: chatTransaction.source,
        });
        initialState = teleportReducer(initialState, { type: "to", value: chatTransaction.destination });
        initialState = teleportReducer(initialState, { type: "asset", value: chatTransaction.asset });
        initialState = teleportReducer(initialState, { type: "amount", value: chatTransaction.amount });

        setInitialState(initialState);
      }

      setData(undefined);
    }
  }, [data, setData]);

  if (transactionType === TransactionType.Teleport) {
    return <Teleport initialState={initialState} />;
  }

  return null;
};
