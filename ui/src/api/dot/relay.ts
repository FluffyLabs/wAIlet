import { dotClient } from "@/api/clients";
import { dot as dotDescriptors } from "@polkadot-api/descriptors";
import { fromRelayToAssetHub, watchAccoutFreeBalance } from "../common";
import type { AssetInChain } from "../types";

const api = dotClient.getTypedApi(dotDescriptors);

const dot: AssetInChain = {
  chain: "dot",
  symbol: "DOT",
  watchFreeBalance: watchAccoutFreeBalance(api),
  teleport: {
    dotAh: (...args) => api.tx.XcmPallet.transfer_assets(fromRelayToAssetHub(...args)),
  },
};

export default [dot];
