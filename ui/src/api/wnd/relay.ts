import { wndClient } from "@/api/clients";
import { wnd as descriptors } from "@polkadot-api/descriptors";
import { fromRelayToAssetHub, watchAccoutFreeBalance } from "../common";
import type { AssetInChain } from "../types";

const api = wndClient.getTypedApi(descriptors);

const wnd: AssetInChain = {
  chain: "wnd",
  symbol: "WND",
  watchFreeBalance: watchAccoutFreeBalance(api),
  teleport: {
    wndAh: (...args) => api.tx.XcmPallet.transfer_assets(fromRelayToAssetHub(...args)),
  },
};

export default [wnd];
