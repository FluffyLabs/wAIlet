import { createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { pasRelayChain } from "./pas";
import { smoldot } from "./smoldot";

const smoldotParaChain = Promise.all([pasRelayChain, import("polkadot-api/chains/paseo_asset_hub")]).then(
  ([relayChain, { chainSpec }]) => smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
);

export const pasAhClient = createClient(getSmProvider(smoldotParaChain));
