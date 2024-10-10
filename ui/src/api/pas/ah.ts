import { pasAhClient } from "@/api/clients";
import { pasAh as descriptors } from "@polkadot-api/descriptors";
import { fromAssetHubToRelay, watchAccoutFreeBalance } from "../common";
import type { AssetInChain } from "../types";

const api = pasAhClient.getTypedApi(descriptors);

const chain = "pasAh";
const pas: AssetInChain = {
  chain,
  symbol: "PAS",
  watchFreeBalance: watchAccoutFreeBalance(api),
  teleport: {
    pas: (...args) => api.tx.PolkadotXcm.transfer_assets(fromAssetHubToRelay(...args)),
  },
};

export default [pas];
