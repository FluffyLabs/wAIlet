import { Teleport } from "@/Teleport";
import { type TeleporterState, teleportReducer } from "@/Teleport/Teleport";
import type { AssetId, ChainId } from "@/api";
import { useChat } from "./chatCtx";

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

export const TransactionProvider: React.FC = () => {
  if (!useChat().data || !useChat().data?.[0]) return null;

  const [chatTransaction] = useChat().data as [ChatTransaction];

  if (chatTransaction.kind === TransactionType.Teleport) {
    let initialState: TeleporterState = teleportReducer({} as TeleporterState, {
      type: "from",
      value: chatTransaction.source,
    });
    initialState = teleportReducer(initialState, { type: "to", value: chatTransaction.destination });
    initialState = teleportReducer(initialState, { type: "asset", value: chatTransaction.asset });
    initialState = teleportReducer(initialState, { type: "amount", value: chatTransaction.amount });

    return <Teleport initialState={initialState} />;
  }

  return null;
};
