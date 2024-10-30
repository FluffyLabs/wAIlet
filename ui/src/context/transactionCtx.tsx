import type { AssetId, ChainId } from "@/api";
import { type Dispatch, type PropsWithChildren, createContext, useContext, useReducer } from "react";

type TransactionCtx = {
  state: TransactionState;
  dispatch: Dispatch<TransactionAction>;
};

export type TeleporterFormData = {
  from: ChainId;
  to: ChainId;
  asset: AssetId;
  amount: number;
};

export enum TransactionType {
  Teleport = "teleport",
}

export enum TransactionActionType {
  INITIATE_TRANSACTION = "INITIATE_TRANSACTION",
  UPDATE_FORM_DATA = "UPDATE_FORM_DATA",
}

export type TransactionState = { type: null } | { type: TransactionType.Teleport; formData: TeleporterFormData };

export type TransactionAction =
  | {
      type: TransactionActionType.INITIATE_TRANSACTION;
      payload: { type: TransactionType; formData: TeleporterFormData };
    }
  | { type: TransactionActionType.UPDATE_FORM_DATA; payload: Partial<TeleporterFormData> };

const INITIAL_STATE = { type: null };

function transactionReducer(state: TransactionState, action: TransactionAction): TransactionState {
  switch (action.type) {
    case TransactionActionType.INITIATE_TRANSACTION:
      switch (action.payload.type) {
        case TransactionType.Teleport:
          return { type: action.payload.type, formData: action.payload.formData };
        default:
          return state;
      }
    case TransactionActionType.UPDATE_FORM_DATA:
      if (!state.type) return state;
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
}

export const TransactionCtx = createContext<TransactionCtx>({} as TransactionCtx);
export const useTransaction = () => useContext(TransactionCtx);

export const TransactionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  return <TransactionCtx.Provider value={{ state, dispatch }}>{children}</TransactionCtx.Provider>;
};
