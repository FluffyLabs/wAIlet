import { rocClient } from "@/api/clients";
import { roc as descriptors } from "@polkadot-api/descriptors";
import { fromRelayToAssetHub, watchAccoutFreeBalance } from "../common";
import type { AssetInChain } from "../types";

const api = rocClient.getTypedApi(descriptors);

const roc: AssetInChain = {
  chain: "roc",
  symbol: "ROC",
  watchFreeBalance: watchAccoutFreeBalance(api),
  teleport: {
    rocAh: (...args) => api.tx.XcmPallet.transfer_assets(fromRelayToAssetHub(...args)),
  },
};

export default [roc];
