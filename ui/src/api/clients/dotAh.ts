import { createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { dotRelayChain } from "./dot";
import { smoldot } from "./smoldot";

const smoldotParaChain = Promise.all([dotRelayChain, import("polkadot-api/chains/polkadot_asset_hub")]).then(
  ([relayChain, { chainSpec }]) => smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
);

export const dotAhClient = createClient(getSmProvider(smoldotParaChain));
