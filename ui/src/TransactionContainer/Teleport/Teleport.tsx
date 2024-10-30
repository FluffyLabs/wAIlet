import { type AssetId, CHAIN_NAMES, type ChainId, chains } from "@/api";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionActionType, TransactionType, useTransaction } from "@/context/transactionCtx";
import type React from "react";
import { useEffect, useState } from "react";
import { FeesAndSubmit } from "./FeesAndSubmit";
import { FormattedToken } from "./FormattedToken";
import { useBalance } from "./use-balance";

const Selector: React.FC<{
  value: string | undefined;
  onChange: (value: string) => void;
  values: Array<{ key: string; display: string }>;
}> = ({ onChange, values, value }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {values.map(({ key, display }) => (
        <SelectItem key={key} value={key}>
          {display}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const fromChains = [...chains.keys()];
const chainToSelectorValue = (chain: ChainId) => ({
  key: chain,
  display: CHAIN_NAMES[chain],
});

export const Teleport: React.FC = () => {
  const transaction = useTransaction();

  if (transaction.state.type !== TransactionType.Teleport) {
    throw new Error("Transaction data mismatched with transaction component.");
  }

  const {
    state: {
      formData: { from, to, asset, amount },
    },
    dispatch,
  } = transaction;

  const fromBalance = useBalance(from, asset);
  const [toOptions, setToOptions] = useState<ChainId[]>([]);
  const [assetOptions, setAssetOptions] = useState<AssetId[]>([]);

  useEffect(() => {
    const newToOptions = Object.keys(chains.get(from)?.get(asset)?.teleport || {}) as ChainId[];
    setToOptions(newToOptions);
    dispatch({ type: TransactionActionType.UPDATE_FORM_DATA, payload: { to: newToOptions[0] } });
  }, [from, asset, dispatch]);

  useEffect(() => {
    const newAssetOptions = [...(chains.get(from)?.keys() || [])].filter(
      (x) => Object.keys(chains.get(from)?.get(x)?.teleport || {}).length,
    );
    setAssetOptions(newAssetOptions);
    dispatch({ type: TransactionActionType.UPDATE_FORM_DATA, payload: { asset: newAssetOptions[0] } });
  }, [from, dispatch]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">From Chain:</Label>
        <Selector
          value={from}
          onChange={(value) =>
            dispatch({ type: TransactionActionType.UPDATE_FORM_DATA, payload: { from: value as ChainId } })
          }
          values={fromChains.map(chainToSelectorValue)}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Asset:</Label>
        <Selector
          value={asset}
          onChange={(value) =>
            dispatch({ type: TransactionActionType.UPDATE_FORM_DATA, payload: { asset: value as AssetId } })
          }
          values={assetOptions.map((key) => ({
            key,
            display: key,
          }))}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">To Chain:</Label>
        <Selector
          value={to}
          onChange={(value) =>
            dispatch({ type: TransactionActionType.UPDATE_FORM_DATA, payload: { to: value as ChainId } })
          }
          values={toOptions.map(chainToSelectorValue)}
        />
      </div>
      <Card className="w-full">
        <CardHeader className="m-0 p-2 text-center">Transferable Balances</CardHeader>
        <ul className="grid gap-3 m-2">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">{CHAIN_NAMES[from]}</span>
            <span>
              <FormattedToken asset={asset} value={fromBalance} />
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">{CHAIN_NAMES[to]}</span>
            <span>
              <FormattedToken asset={asset} value={useBalance(to, asset)} />
            </span>
          </li>
        </ul>
      </Card>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          value={amount?.toString() ?? ""}
          onChange={({ target: { value } }) => {
            const amount = Number(value);
            dispatch({
              type: TransactionActionType.UPDATE_FORM_DATA,
              payload: { amount: Number.isNaN(amount) ? undefined : amount },
            });
          }}
          type="number"
          id="amount"
          placeholder="Amount to teleport"
        />
      </div>
      <FeesAndSubmit from={from} to={to} asset={asset} amount={amount} />
    </div>
  );
};
