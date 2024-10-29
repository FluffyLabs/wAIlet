import type { AssetId, ChainId } from "@/api";
import { useChat } from "ai/react";
import { type PropsWithChildren, useEffect } from "react";
import { ChatCtx } from "./chatCtx";
import { TransactionActionType, TransactionType, useTransaction } from "./transactionCtx";

type ChatTransaction = {
  kind: TransactionType.Teleport;
  source: ChainId;
  destination: ChainId;
  asset: AssetId;
  amount: number;
};

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const chat = useChat({
    api: import.meta.env.VITE_CHAT_ENDPOINT,
    keepLastMessageOnError: true,
  });

  const { data, setData } = chat;
  const { dispatch } = useTransaction();

  useEffect(() => {
    if (data?.[0]) {
      const [chatTransaction] = data as [ChatTransaction];

      if (chatTransaction.kind === TransactionType.Teleport) {
        dispatch({
          type: TransactionActionType.INITIATE_TRANSACTION,
          payload: {
            type: chatTransaction.kind,
            formData: {
              from: chatTransaction.source,
              to: chatTransaction.destination,
              asset: chatTransaction.asset,
              amount: chatTransaction.amount,
            },
          },
        });
      }

      setData(undefined);
    }
  }, [data, setData, dispatch]);

  return <ChatCtx.Provider value={chat}>{children}</ChatCtx.Provider>;
};
