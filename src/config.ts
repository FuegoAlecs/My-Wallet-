import { cookieStorage, createConfig } from "@account-kit/react";
import { Connection } from "@solana/web3.js";
import { sepolia } from "@account-kit/infra";

export const config = createConfig({
  chain: sepolia,
  solana: {
    connection: new Connection(
      "https://solana-devnet.g.alchemy.com/v2/<API_KEY>",
      {
        wsEndpoint: "wss://api.devnet.solana.com",
        commitment: "confirmed",
      }
    ),
    policyId: "<PolicyId>"
  },
  storage: cookieStorage,
  passkeyCreationOptions: "conditional",
});
